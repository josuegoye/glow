from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from db.base import Base

class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    schedule = Column(String, nullable=True)
    location_url = Column(String, nullable=True)
    plan_type = Column(String, default="Starter")
    is_active = Column(Boolean, default=True)

class ModuleConfig(Base):
    __tablename__ = "module_configs"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, index=True, nullable=False)
    offers = Column(Boolean, default=True)
    raffle = Column(Boolean, default=True)
    chat = Column(Boolean, default=True)
    game = Column(Boolean, default=True)
    qr = Column(Boolean, default=True)
    terms = Column(Boolean, default=True)
    schedule = Column(Boolean, default=True)
    location = Column(Boolean, default=True)
    whatsapp = Column(Boolean, default=True)

class Terms(Base):
    __tablename__ = "terms"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, index=True, nullable=False)
    content = Column(String, nullable=True)
