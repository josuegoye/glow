from pydantic import BaseModel
from typing import Optional

class OfferBase(BaseModel):
    name: str
    price: str
    note: Optional[str] = None
    status: Optional[str] = "active"

class OfferCreate(OfferBase):
    pass

class OfferUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[str] = None
    note: Optional[str] = None
    status: Optional[str] = None

class OfferResponse(OfferBase):
    id: int
    business_id: int

    class Config:
        from_attributes = True
