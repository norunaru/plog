from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship

from src.database import Base


class Trail(Base):
    __tablename__ = "trail"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    lat = Column(ARRAY(Float), nullable=False)
    lon = Column(ARRAY(Float), nullable=False)
    shop_cnt = Column(Integer, nullable=False)
    toilet_cnt = Column(Integer, nullable=False)
    mountain = Column(Integer, nullable=False)
    ocean = Column(Integer, nullable=False)
    city = Column(Integer, nullable=False)
    lake = Column(Integer, nullable=False)
    distance = Column(Float, nullable=False)

    trailCluster = relationship("TrailCluster", back_populates="trail")
    memberCluster = relationship("MemberCluster", back_populates="trail")
    noraml = relationship("TrailNormal", back_populates="trail")

class TrailNormal(Base):
    __tablename__ = "trail_normal"

    id = Column(Integer, primary_key=True, index=True)
    trail_id = Column(Integer, ForeignKey("trail.id"), nullable=False)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    shop_cnt = Column(Float, nullable=False)
    toilet_cnt = Column(Float, nullable=False)
    mountain = Column(Float, nullable=False)
    ocean = Column(Float, nullable=False)
    city = Column(Float, nullable=False)
    lake = Column(Float, nullable=False)
    distance = Column(Float, nullable=False)

    trail = relationship("Trail", back_populates="noraml")

class TrailCluster(Base):
    __tablename__ = "trail_cluster"

    id = Column(Integer, primary_key=True, index=True)
    trail_id = Column(Integer, ForeignKey("trail.id"), nullable=False)
    cluster_id = Column(Integer, index=True)

    trail = relationship("Trail", back_populates="trailCluster")

class MemberScore(Base):
    __tablename__ = "member_score"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    score = Column(ARRAY(Float), index=True)

class MemberCluster(Base):
    __tablename__ = "member_cluster"

    id = Column(Integer, primary_key=True, index=True)
    trail_id = Column(Integer, ForeignKey("trail.id"), nullable=False)
    cluster_id = Column(Integer, index=True)

    trail = relationship("Trail", back_populates="memberCluster")