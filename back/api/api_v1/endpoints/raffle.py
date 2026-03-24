from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
import random

from db.session import get_db
from models.raffle import Raffle, RaffleEntry
from models.user import User
from schemas.raffle import RaffleCreate, RaffleResponse, RaffleUpdate, RaffleEntryResponse
from api.deps import get_current_user

router = APIRouter()

@router.get("/", response_model=List[RaffleResponse])
async def read_raffles(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Raffle).where(Raffle.business_id == current_user.business_id))
    return result.scalars().all()

@router.post("/", response_model=RaffleResponse)
async def create_raffle(raffle_in: RaffleCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_obj = Raffle(**raffle_in.model_dump(), business_id=current_user.business_id)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.get("/{raffle_id}/entries", response_model=List[RaffleEntryResponse])
async def read_raffle_entries(raffle_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Verify ownership
    result_raffle = await db.execute(select(Raffle).where(Raffle.id == raffle_id, Raffle.business_id == current_user.business_id))
    if not result_raffle.scalars().first():
        raise HTTPException(status_code=404, detail="Raffle not found")
        
    result = await db.execute(select(RaffleEntry).where(RaffleEntry.raffle_id == raffle_id))
    return result.scalars().all()

@router.post("/{raffle_id}/draw", response_model=RaffleEntryResponse)
async def draw_winner(raffle_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Verify ownership
    result_raffle = await db.execute(select(Raffle).where(Raffle.id == raffle_id, Raffle.business_id == current_user.business_id))
    raffle = result_raffle.scalars().first()
    if not raffle:
        raise HTTPException(status_code=404, detail="Raffle not found")
        
    result = await db.execute(select(RaffleEntry).where(RaffleEntry.raffle_id == raffle_id))
    entries = result.scalars().all()
    if not entries:
        raise HTTPException(status_code=400, detail="No entries in this raffle")
        
    winner = random.choice(entries)
    raffle.status = "closed"
    await db.commit()
    return winner
