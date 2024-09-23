# service.py
import random
from typing import List

from sklearn.neighbors import NearestNeighbors
from sqlalchemy.orm import Session
from sklearn.cluster import KMeans
import numpy as np
from . import models
from .schemas import TrailNormalCreate

"""
산책로 정규화
1. 산책로 시작점 위치, 산책로 편의점 갯수, 화장실 갯수, 주변의 것, 산책로 길이 정보 최대 최소 값을 바탕으로 정규화 (이때 거리를 우선 순위를 증가시키기 위해서 0~2로 둠)
2. 해당 값을 DB에 저장
"""
def normalization_trails(db: Session):
    # 기존 클러스터 정보 삭제
    db.query(models.TrailNormal).delete()
    db.commit()

    trails = db.query(models.Trail).all()

    if not trails:
        raise ValueError("No trails found")

    # 모든 트레일의 각 feature별 최대값과 최소값을 계산
    lat_values = [trail.lat[0] for trail in trails]  # 첫 번째 요소 값만 사용
    lon_values = [trail.lon[0] for trail in trails]
    shop_cnt_values = [trail.shop_cnt for trail in trails]
    toilet_cnt_values = [trail.toilet_cnt for trail in trails]
    distance_values = [trail.distance for trail in trails]
    area_values = [trail.area for trail in trails]

    # 각 feature의 최대값과 최소값을 구함
    lat_min, lat_max = min(lat_values), max(lat_values)
    lon_min, lon_max = min(lon_values), max(lon_values)
    shop_cnt_min, shop_cnt_max = min(shop_cnt_values), max(shop_cnt_values)
    toilet_cnt_min, toilet_cnt_max = min(toilet_cnt_values), max(toilet_cnt_values)
    distance_min, distance_max = min(distance_values), max(distance_values)
    area_min, area_max = min(area_values), max(area_values)

    for trail in trails:
        # 각 feature에 대해 정규화 진행
        normalized_lat = 2 * (trail.lat[0] - lat_min) / (lat_max - lat_min) if lat_max != lat_min else 0
        normalized_lon = 2 * (trail.lon[0] - lon_min) / (lon_max - lon_min) if lon_max != lon_min else 0
        normalized_shop_cnt = (trail.shop_cnt - shop_cnt_min) / (
                    shop_cnt_max - shop_cnt_min) if shop_cnt_max != shop_cnt_min else 0
        normalized_toilet_cnt = (trail.toilet_cnt - toilet_cnt_min) / (
                    toilet_cnt_max - toilet_cnt_min) if toilet_cnt_max != toilet_cnt_min else 0
        normalized_distance = (trail.distance - distance_min) / (
                    distance_max - distance_min) if distance_max != distance_min else 0
        normalized_area = (trail.area - area_min) / (area_max - area_min) if area_max != area_min else 0

        # TrailNormal 모델에 저장하기 위해 새로운 객체 생성
        normalized_trail = TrailNormalCreate(
            trail_id=trail.id,
            lat=normalized_lat,
            lon=normalized_lon,
            shop_cnt=normalized_shop_cnt,
            toilet_cnt=normalized_toilet_cnt,
            distance=normalized_distance,
            area=normalized_area,
            park = trail.park,
            ocean = trail.ocean,
            city = trail.city,
            lake = trail.lake
            # 여기에서 필요한 다른 필드들도 추가할 수 있습니다
        )

        # DB에 저장
        db_trail_normal = models.TrailNormal(**normalized_trail.dict())
        db.add(db_trail_normal)

    db.commit()

    return db_trail_normal

"""
산책로 클러스터링
1. 산책로 시작점 위치, 산책로 편의점 갯수, 화장실 갯수, 주변에 (산,바다, 도심,강) 중 어떤 것인지, 산책로 길이 정보 DB에서 꺼내오기
2. 정규화 진행
3. KNN을 통해서 산책로 클러스터링
4. 클러스터링된 산책로를 각각 저장
"""
def cluster_trails(db: Session, n_clusters: int = 5):
    normalization_trails(db)

    trails = db.query(models.TrailNormal).all()

    if not trails:
        raise ValueError("No trails found")

    # feature vector 생성 (lat, lon, shop_cnt, toilet_cnt 등을 사용할 수 있음)
    feature_vectors = np.array([
        [trail.lat, trail.lon, trail.shop_cnt, trail.toilet_cnt, trail.park, trail.ocean, trail.city, trail.lake, trail.distance,trail.area]
        for trail in trails
    ])

    # K-Means 모델 생성 및 훈련
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    kmeans.fit(feature_vectors)

    # 기존 클러스터 정보 삭제
    db.query(models.TrailCluster).delete()
    db.commit()

    # 클러스터 결과 저장
    clusters = {i: [] for i in range(n_clusters)}
    for idx, label in enumerate(kmeans.labels_):
        trail_id = trails[idx].trail_id
        cluster_id = int(label)  # numpy.int32를 int로 변환

        clusters[cluster_id].append(trail_id)

        # TrailCluster 테이블에 저장
        trail_cluster = models.TrailCluster(trail_id=trail_id, cluster_id=cluster_id)
        db.add(trail_cluster)

    db.commit()

    return clusters

"""
산책로 클러스터링 바탕 추천 시스템
1. 유저가 고른 산책로 리스트(평점을 3점 이상 준 산책로)를 입력 받음
2. 해당 산책로가 포함된 클러스터 그룹 내의 산책로들을 리스트에 담기
3. 해당 산책로 리스트 중에서 3개를 랜덤으로 뽑아서 추천
"""
def recomend_trail(db: Session, trailList: List[int]):
    # 유저가 선택한 산책로 ID 리스트를 set으로 변환
    selected_trails = set(trailList)
    recomend_list = set()

    # 선택한 산책로가 속한 클러스터 ID들을 한 번에 가져옴
    trail_clusters = db.query(models.TrailCluster)\
        .filter(models.TrailCluster.trail_id.in_(trailList))\
        .all()

    cluster_ids = {tc.cluster_id for tc in trail_clusters}

    # 해당 클러스터에 속한 산책로들을 한 번에 가져옴
    same_cluster_trails = db.query(models.TrailCluster)\
        .filter(models.TrailCluster.cluster_id.in_(cluster_ids))\
        .all()

    # 추천 리스트에 추가 (자기 자신은 제외)
    for same_cluster_trail in same_cluster_trails:
        if same_cluster_trail.trail_id not in selected_trails:
            recomend_list.add(same_cluster_trail.trail_id)

    # 추천 리스트에서 랜덤으로 3개의 산책로를 선택
    recomend_list = list(recomend_list)
    random.shuffle(recomend_list)
    return recomend_list[:3]

"""
유저 별점 추천 시스템
1. 내가 가지고 있는 별점을 가지고 있는 유저들을 선택 => 0은 별점이 없는 것
2. knn 알고리즘을 통해서 가장 가까운 5명의 유저를 가져옴
3. 해당 유저들의 0을 제외한 값의 평균값을 구함
4. 해당 평균 값들 중 가장 높은 3개를 추천
"""
def recommend_score(db: Session, user: int):
    # 1. 특정 유저의 점수 데이터 가져오기
    pickuser = db.query(models.MemberScore).filter(models.MemberScore.user_id == user).first()
    usersScores = db.query(models.MemberScore).all()

    if not pickuser:
        raise ValueError("User not found")

    # 선택된 유저의 점수 리스트 (0이 아닌 것만 남김)
    pickUserScores = np.array(pickuser.score)

    # 모든 유저의 점수를 리스트로 변환 (0이 아닌 값만 남김)
    scores_matrix = []
    user_ids = []

    for userScore in usersScores:
        score_array = np.array(userScore.score)
        # 점수가 0이 아닌 경우만 저장
        scores_matrix.append(score_array)
        user_ids.append(userScore.user_id)

    scores_matrix = np.array(scores_matrix)

    # 2. KNN 알고리즘으로 유사한 유저 5명 찾기
    knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=5)
    knn.fit(scores_matrix)

    # 유저의 점수를 이용해 유사한 유저 5명 찾기
    distances, indices = knn.kneighbors([pickUserScores], n_neighbors=5)

    # 3. 유사한 유저들의 점수 중 0을 제외한 평균 계산
    similar_users = indices.flatten()  # 가장 유사한 유저들의 인덱스 가져오기
    average_scores = np.zeros(pickUserScores.shape)

    for user_idx in similar_users:
        # 유사한 유저의 점수를 가져옴
        similar_user_scores = scores_matrix[user_idx]
        # 0이 아닌 점수만을 가져와서 평균 계산
        non_zero_scores = np.where(similar_user_scores != 0, similar_user_scores, np.nan)
        average_scores = np.nanmean([average_scores, non_zero_scores], axis=0)

    # 4. 평균값 중에서 가장 높은 3개의 아이템 추천
    # 0이 아닌 값들만 고려한 후, 가장 높은 값 3개 찾기
    top_3_items = np.argsort(average_scores)[-3:][::-1]  # 상위 3개 아이템의 인덱스

    # 추천 아이템 출력
    recommended_items = [(item_index, average_scores[item_index]) for item_index in top_3_items]

    return recommended_items

