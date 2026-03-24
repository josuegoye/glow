from sqlalchemy import Column, Integer, String
from db.base import Base

class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, index=True, nullable=False)
    name = Column(String, nullable=False)
    price = Column(String, nullable=False)
    note = Column(String, nullable=True)
    status = Column(String, default="active")
