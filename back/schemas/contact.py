from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ContactBase(BaseModel):
    name: str
    phone: str
    origin: Optional[str] = None
    status: Optional[str] = "new"
    notes: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    origin: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class ContactResponse(ContactBase):
    id: int
    business_id: int
    created_at: datetime

    class Config:
        from_attributes = True
