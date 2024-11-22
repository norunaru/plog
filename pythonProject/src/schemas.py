from pydantic import BaseModel
from typing import List, Optional


class TrailBase(BaseModel):
    name: str
    lat: List[float]
    lon: List[float]
    shop_cnt: float
    toilet_cnt: float
    park: float
    ocean: float
    city: float
    lake: float
    distance: float
    area: float


class TrailCreate(TrailBase):
    pass


class Trail(TrailBase):
    id: int
    trailCluster: Optional[List["TrailCluster"]] = None
    memberCluster: Optional[List["MemberCluster"]] = None
    normal: Optional[List["TrailNormal"]] = None

    class Config:
        orm_mode = True


class TrailNormalBase(BaseModel):
    trail_id: int
    lat: float
    lon: float
    shop_cnt: float
    toilet_cnt: float
    park: float
    ocean: float
    city: float
    lake: float
    distance: float
    area: float


class TrailNormalCreate(TrailNormalBase):
    pass


class TrailNormal(TrailNormalBase):
    id: int

    class Config:
        orm_mode = True


class TrailClusterBase(BaseModel):
    trail_id: int
    cluster_id: int


class TrailClusterCreate(TrailClusterBase):
    pass


class TrailCluster(TrailClusterBase):
    id: int

    class Config:
        orm_mode = True


class MemberScoreBase(BaseModel):
    user_id: int
    score: List[float]


class MemberScoreCreate(MemberScoreBase):
    pass


class MemberScore(MemberScoreBase):
    id: int

    class Config:
        orm_mode = True


class MemberClusterBase(BaseModel):
    trail_id: int
    cluster_id: int


class MemberClusterCreate(MemberClusterBase):
    pass


class MemberCluster(MemberClusterBase):
    id: int

    class Config:
        orm_mode = True
