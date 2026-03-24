from pydantic import BaseModel
from typing import Optional

class BusinessBase(BaseModel):
    name: str
    slug: str
    phone: Optional[str] = None
    schedule: Optional[str] = None
    location_url: Optional[str] = None
    plan_type: Optional[str] = "Starter"

class BusinessCreate(BusinessBase):
    pass

class BusinessUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    schedule: Optional[str] = None
    location_url: Optional[str] = None
    plan_type: Optional[str] = None

class BusinessResponse(BusinessBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True
