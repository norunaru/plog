from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Default App"
    debug: bool = False
    database_url: str

    class Config:
        env_file = "src/.env"  # 이 부분이 .env 파일을 읽도록 설정함

# 설정 인스턴스를 생성
settings = Settings()

SQLALCHEMY_DATABASE_URL = settings.database_url

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()