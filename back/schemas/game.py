from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class GameConfigBase(BaseModel):
    title: Optional[str] = "Girar Glow"
    rule: Optional[str] = None
    daily_limit: Optional[str] = None
    time_window: Optional[str] = None
    winner_message: Optional[str] = None
    loser_message: Optional[str] = None
    play_rule: Optional[str] = None
    stock: Optional[str] = None

class GameConfigCreate(GameConfigBase):
    pass

class GameConfigUpdate(GameConfigBase):
    pass

class GameConfigResponse(GameConfigBase):
    id: int
    business_id: int

    class Config:
        from_attributes = True

class GameSpinResponse(BaseModel):
    id: int
    business_id: int
    phone: str
    won: bool
    prize_name: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
