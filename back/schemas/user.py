from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str
    role: Optional[str] = "BUSINESS"

class UserResponse(UserBase):
    id: int
    role: str
    business_id: Optional[int]

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
