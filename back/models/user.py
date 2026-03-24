from sqlalchemy import Column, Integer, String, Boolean, Enum
from sqlalchemy.orm import relationship
import enum
from db.base import Base

class RoleEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    BUSINESS = "BUSINESS"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.BUSINESS, nullable=False)
    
    business_id = Column(Integer, nullable=True) # Null for ADMIN
