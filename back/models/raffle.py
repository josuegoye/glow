from sqlalchemy import Column, Integer, String, DateTime
import datetime
from db.base import Base

class Raffle(Base):
    __tablename__ = "raffles"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, index=True, nullable=False)
    title = Column(String, nullable=False)
    prize = Column(String, nullable=False)
    draw_date = Column(String, nullable=True)
    time_window = Column(String, nullable=True)
    description = Column(String, nullable=True)
    status = Column(String, default="open")

class RaffleEntry(Base):
    __tablename__ = "raffle_entries"

    id = Column(Integer, primary_key=True, index=True)
    raffle_id = Column(Integer, index=True, nullable=False)
    name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
