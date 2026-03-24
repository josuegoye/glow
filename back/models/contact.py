from sqlalchemy import Column, Integer, String, DateTime
import datetime
from db.base import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, index=True, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    origin = Column(String, nullable=True)
    status = Column(String, default="new")
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
