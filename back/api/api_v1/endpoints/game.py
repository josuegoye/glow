from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from db.session import get_db
from models.game import GameConfig, GameSpin
from models.user import User
from schemas.game import GameConfigResponse, GameConfigUpdate, GameSpinResponse
from api.deps import get_current_user

router = APIRouter()

@router.get("/config", response_model=GameConfigResponse)
async def read_game_config(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(GameConfig).where(GameConfig.business_id == current_user.business_id))
    config = result.scalars().first()
    if not config:
        # Auto-create if not exists
        config = GameConfig(business_id=current_user.business_id)
        db.add(config)
        await db.commit()
        await db.refresh(config)
    return config

@router.put("/config", response_model=GameConfigResponse)
async def update_game_config(config_in: GameConfigUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(GameConfig).where(GameConfig.business_id == current_user.business_id))
    db_obj = result.scalars().first()
    if not db_obj:
        db_obj = GameConfig(business_id=current_user.business_id)
        db.add(db_obj)
        
    update_data = config_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
        
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.get("/spins", response_model=List[GameSpinResponse])
async def read_game_spins(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(GameSpin).where(GameSpin.business_id == current_user.business_id))
    return result.scalars().all()
