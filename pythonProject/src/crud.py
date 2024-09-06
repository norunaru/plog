from sqlalchemy.orm import Session
from src import models, schemas


# Trail CRUD operations
def get_trail(db: Session, trail_id: int):
    return db.query(models.Trail).filter(models.Ttrail.id == trail_id).first()


def get_trails(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Trail).offset(skip).limit(limit).all()


def create_trail(db: Session, trail: schemas.TrailCreate):
    db_trail = models.Trail(
        name=trail.name,
        lat=trail.lat,
        lon=trail.lon,
        shop_cnt=trail.shop_cnt,
        toilet_cnt=trail.toilet_cnt,
        mountain=trail.mountain,
        ocean=trail.ocean,
        city=trail.city,
        lake=trail.lake,
        distance=trail.distance
    )
    db.add(db_trail)
    db.commit()
    db.refresh(db_trail)
    return db_trail


# TrailNormal CRUD operations
def get_trail_normal(db: Session, trail_normal_id: int):
    return db.query(models.TrailNormal).filter(models.TrailNormal.id == trail_normal_id).first()


def get_trail_normals(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.TrailNormal).offset(skip).limit(limit).all()


def create_trail_normal(db: Session, trail_normal: schemas.TrailNormalCreate):
    db_trail_normal = models.TrailNormal(
        trail_id=trail_normal.trail_id,
        lat=trail_normal.lat,
        lon=trail_normal.lon,
        shop_cnt=trail_normal.shop_cnt,
        toilet_cnt=trail_normal.toilet_cnt,
        mountain=trail_normal.mountain,
        ocean=trail_normal.ocean,
        city=trail_normal.city,
        lake=trail_normal.lake,
        distance=trail_normal.distance
    )
    db.add(db_trail_normal)
    db.commit()
    db.refresh(db_trail_normal)
    return db_trail_normal


# TrailCluster CRUD operations
def get_trail_cluster(db: Session, trail_cluster_id: int):
    return db.query(models.TrailCluster).filter(models.TrailCluster.id == trail_cluster_id).first()


def get_trail_clusters(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.TrailCluster).offset(skip).limit(limit).all()


def create_trail_cluster(db: Session, trail_cluster: schemas.TrailClusterCreate):
    db_trail_cluster = models.TrailCluster(
        trail_id=trail_cluster.trail_id,
        cluster_id=trail_cluster.cluster_id
    )
    db.add(db_trail_cluster)
    db.commit()
    db.refresh(db_trail_cluster)
    return db_trail_cluster


# MemberScore CRUD operations
def get_member_score(db: Session, member_score_id: int):
    return db.query(models.MemberScore).filter(models.MemberScore.id == member_score_id).first()


def get_member_scores(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.MemberScore).offset(skip).limit(limit).all()


def create_member_score(db: Session, member_score: schemas.MemberScoreCreate):
    db_member_score = models.MemberScore(
        user_id=member_score.user_id,
        score=member_score.score
    )
    db.add(db_member_score)
    db.commit()
    db.refresh(db_member_score)
    return db_member_score


# MemberCluster CRUD operations
def get_member_cluster(db: Session, member_cluster_id: int):
    return db.query(models.MemberCluster).filter(models.MemberCluster.id == member_cluster_id).first()


def get_member_clusters(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.MemberCluster).offset(skip).limit(limit).all()


def create_member_cluster(db: Session, member_cluster: schemas.MemberClusterCreate):
    db_member_cluster = models.MemberCluster(
        trail_id=member_cluster.trail_id,
        cluster_id=member_cluster.cluster_id
    )
    db.add(db_member_cluster)
    db.commit()
    db.refresh(db_member_cluster)
    return db_member_cluster
