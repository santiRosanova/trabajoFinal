from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Rasti QC API"
    api_prefix: str = "/api/v1"
    allowed_origins: list[str] = ["http://localhost:5173"]
    roboflow_url: str
    roboflow_key: str
    roboflow_workspace: str
    roboflow_workflow: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()