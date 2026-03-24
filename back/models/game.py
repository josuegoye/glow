from sqlalchemy import Column, Integer, String, Boolean, DateTime
import datetime
from db.base import Base

class GameConfig(Base):
    __tablename__ = "game_configs"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, index=True, nullable=False)
    title = Column(String, default="Girar Glow")
    rule = Column(String, nullable=True)
    daily_limit = Column(String, nullable=True)
    time_window = Column(String, nullable=True)
    winner_message = Column(String, nullable=True)
    loser_message = Column(String, nullable=True)
    play_rule = Column(String, nullable=True)
    stock = Column(String, nullable=True)

class GameSpin(Base):
    __tablename__ = "game_spins"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, index=True, nullable=False)
    phone = Column(String, nullable=False)
    won = Column(Boolean, default=False)
    prize_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
