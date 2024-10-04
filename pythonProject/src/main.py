import random
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from src.database import SessionLocal, engine
from src import crud, models, schemas

from .service import cluster_trails, recomend_trail, recommend_score
from .visualization import recommend_and_visualize, cluster_and_visualize_trails

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 테스트용 API - 유저별 임의 점수 생성
@app.post("/users/generate_scores/")
def generate_user_scores(db: Session = Depends(get_db)):
    random.seed(42)  # 결과 재현을 위해 seed 고정
    for user_id in range(1, 21):
        ratings = [random.choice([0.0, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]) for _ in range(100)]
        user_score = models.MemberScore(user_id=user_id, score=ratings)
        db.add(user_score)
    db.commit()

    return {"message": "20명의 유저에 대한 임의의 별점 데이터가 성공적으로 생성되었습니다."}


# 산책로 생성
@app.post("/trails/", response_model=schemas.Trail)
def create_trail(trail: schemas.TrailCreate, db: Session = Depends(get_db)):
    return crud.create_trail(db=db, trail=trail)


# 모든 산책로 조회
@app.get("/trails/", response_model=List[schemas.Trail])
def read_trails(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    trails = crud.get_trails(db, skip=skip, limit=limit)
    return trails


# 특정 산책로 조회
@app.get("/trails/{trail_id}", response_model=schemas.Trail)
def read_trail(trail_id: int, db: Session = Depends(get_db)):
    db_trail = crud.get_trail(db, trail_id=trail_id)
    if db_trail is None:
        raise HTTPException(status_code=404, detail="Trail not found")
    return db_trail


# 클러스터링
@app.post("/trails/cluster/")
def get_clustered_trails(db: Session = Depends(get_db)):
    try:
        clusters = cluster_trails(db)
        return clusters
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


# 추천 기능
@app.post("/trails/recommend/", response_model=List[int])
def recommend_trails(trailList: List[int], db: Session = Depends(get_db)):
    try:
        recommendations = recomend_trail(db, trailList)
        return recommendations
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


# 유저 별점 기반 추천 기능
@app.post("/users/recommend/", response_model=List[int])
def recommend_by_user_score(user_id: int, db: Session = Depends(get_db)):
    try:
        recommendations, scores_matrix, similar_users = recommend_score(db, user_id)
        recommendations = [int(item[0]) for item in recommendations]
        return recommendations
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# 유저 별점 기반 추천 기능
@app.post("/users/recommend/visualize/", response_model=List[int])
def recommend_and_visualize_by_user_score(user_id: int, db: Session = Depends(get_db)):
    try:
        # 추천 결과 수행 및 시각화
        recommendations, scores_matrix = recommend_and_visualize(db, user_id)

        # recommendations가 [(item_index, score), ...] 형태일 경우, item_index만 가져옴
        recommendation_ids = [int(item[0]) for item in recommendations]

        return recommendation_ids
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


# 산책로 클러스터링 및 시각화 기능
@app.post("/trails/cluster/visualize")
def cluster_and_visualize_trails_api(db: Session = Depends(get_db)):
    try:
        clusters = cluster_and_visualize_trails(db)
        return {"message": "클러스터링 및 시각화가 완료되었습니다.", "clusters": clusters}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
