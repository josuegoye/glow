from pydantic import BaseModel
from typing import Optional

class RaffleBase(BaseModel):
    title: str
    prize: str
    draw_date: Optional[str] = None
    time_window: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = "open"

class RaffleCreate(RaffleBase):
    pass

class RaffleUpdate(BaseModel):
    title: Optional[str] = None
    prize: Optional[str] = None
    draw_date: Optional[str] = None
    time_window: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class RaffleResponse(RaffleBase):
    id: int
    business_id: int

    class Config:
        from_attributes = True

class RaffleEntryCreate(BaseModel):
    name: str
    last_name: str
    phone: str

class RaffleEntryResponse(RaffleEntryCreate):
    id: int
    raffle_id: int

    class Config:
        from_attributes = True
