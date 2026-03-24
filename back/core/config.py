from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Glow API"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "placeholder_secret_key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    
    # DATABASE
    # SQLite Connection String for easier local dev without Postgres
    DATABASE_URL: str = "sqlite+aiosqlite:///./glow.db"
    SYNC_DATABASE_URL: str = "sqlite:///./glow.db"
    
settings = Settings()
