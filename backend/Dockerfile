# Imagen de PRODUCCIÓN de la API.
FROM python:3.12-slim AS base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Dependencias primero (mejor cacheo de capas).
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

# Sin --reload en producción.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
