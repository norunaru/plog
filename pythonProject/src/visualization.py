import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
import numpy as np
from sqlalchemy.orm import Session
from sklearn.cluster import KMeans

from . import models
from .service import recommend_score, cluster_trails


def visualize_user_recommendations(user_id, similar_users, scores_matrix):
    """
    선택한 유저, 유사한 유저, 나머지 유저들의 위치를 시각화합니다.
    :param user_id: 선택한 유저의 인덱스
    :param similar_users: 추천된 유사한 유저들의 인덱스 리스트
    :param scores_matrix: 모든 유저들의 점수 행렬
    """
    # PCA로 점수 행렬을 2D로 축소
    pca = PCA(n_components=2)
    reduced_data = pca.fit_transform(scores_matrix)

    # 설명된 분산 비율을 출력하여 PCA 축소 상태를 확인
    explained_variance = pca.explained_variance_ratio_
    print(f"Explained variance by PCA: {explained_variance}")

    # 유저들의 2D 위치
    x = reduced_data[:, 0]
    y = reduced_data[:, 1]

    plt.figure(figsize=(10, 6))

    # 나머지 유저들: 검정색
    plt.scatter(x, y, color='black', label='Other Users', alpha=0.6)

    # 선택한 유저: 빨간색
    plt.scatter(x[user_id], y[user_id], color='red', label='Selected User', s=100)

    # 유사한 유저들: 노란색
    for similar_user in similar_users:
        plt.scatter(x[similar_user], y[similar_user], color='yellow', label='Recommended User', s=70)

    plt.xlabel('PCA Component 1')
    plt.ylabel('PCA Component 2')
    plt.title('User Recommendations Visualization')
    plt.legend()
    plt.show()


def visualize_clustered_trails(trails, cluster_labels):
    """
    산책로들의 위치를 클러스터 그룹에 따라 시각화합니다.
    :param trails: 정규화된 산책로들의 정보 (lat, lon 정보 포함)
    :param cluster_labels: 각 산책로의 클러스터 그룹 라벨
    """
    plt.figure(figsize=(10, 6))

    # 각 클러스터에 속한 산책로들을 다른 색으로 표시
    unique_clusters = np.unique(cluster_labels)
    colors = plt.cm.get_cmap('tab10', len(unique_clusters))

    trail_data = np.array([[trail.lat, trail.lon,
                            trail.shop_cnt, trail.toilet_cnt,
                            trail.distance,
                            trail.park, trail.ocean,
                            trail.city, trail.lake] for trail in trails])

    # PCA로 점수 행렬을 2D로 축소
    pca = PCA(n_components=2)
    reduced_data = pca.fit_transform(trail_data)

    # 설명된 분산 비율을 출력하여 PCA 축소 상태를 확인
    explained_variance = pca.explained_variance_ratio_
    print(f"Explained variance by PCA: {explained_variance}")

    # 산책로들의 2D 위치
    x = reduced_data[:, 0]
    y = reduced_data[:, 1]

    for cluster_id in unique_clusters:
        # 클러스터에 속한 산책로들의 인덱스 필터링
        cluster_mask = (cluster_labels == cluster_id)
        cluster_x = x[cluster_mask]
        cluster_y = y[cluster_mask]

        # 각 클러스터 별로 산책로 표시
        plt.scatter(cluster_x, cluster_y, color=colors(cluster_id), label=f'Cluster {cluster_id}')

    plt.xlabel('PCA Component 1')
    plt.ylabel('PCA Component 2')
    plt.title('Clustered Trails Visualization')
    plt.legend()
    plt.show()


def recommend_and_visualize(db: Session, user: int):
    """
    유저의 점수를 기반으로 추천을 수행하고 결과를 시각화합니다.
    :param db: 데이터베이스 세션
    :param user: 추천을 위한 유저 ID
    """
    # 1. 추천 수행 및 점수 행렬 가져오기
    recommendations, scores_matrix, similar_users = recommend_score(db, user)

    # 3. 유저 추천 결과 시각화
    visualize_user_recommendations(user, similar_users, scores_matrix)

    return recommendations


def cluster_and_visualize_trails(db: Session, n_clusters: int = 6):
    """
    산책로 클러스터링을 수행하고 시각화합니다.
    :param db: 데이터베이스 세션
    :param n_clusters: 클러스터의 개수
    """
    # 1. 클러스터링 수행
    clusters = cluster_trails(db, n_clusters)

    # 2. 정규화된 산책로 정보 가져오기
    trails = db.query(models.TrailNormal).all()

    # 3. TrailNormal과 TrailCluster를 조인하여 클러스터 ID를 가져오기
    trail_cluster_data = db.query(models.TrailNormal, models.TrailCluster).filter(
        models.TrailNormal.trail_id == models.TrailCluster.trail_id
    ).all()

    cluster_labels = np.array([trail_cluster.cluster_id for trail_normal, trail_cluster in trail_cluster_data])

    # 4. 클러스터링 시각화
    visualize_clustered_trails(trails, cluster_labels)

    return clusters
