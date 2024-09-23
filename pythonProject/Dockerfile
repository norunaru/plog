# 베이스 이미지로 Python 3.9 사용
FROM python:3.12.5-slim

# 필요한 파일들을 컨테이너에 복사
COPY requirements.txt ./

RUN apt-get update && apt-get install -y libpq-dev gcc

# 라이브러리 설치
RUN pip install -r requirements.txt

# 어플리케이션 소스 복사
COPY . .

# FastAPI 서버 실행 (uvicorn으로 실행)
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
