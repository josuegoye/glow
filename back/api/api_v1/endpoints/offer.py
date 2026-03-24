from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from db.session import get_db
from models.offer import Offer
from models.user import User
from schemas.offer import OfferCreate, OfferResponse, OfferUpdate
from api.deps import get_current_user

router = APIRouter()

@router.get("/", response_model=List[OfferResponse])
async def read_offers(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Offer).where(Offer.business_id == current_user.business_id))
    return result.scalars().all()

@router.post("/", response_model=OfferResponse)
async def create_offer(offer_in: OfferCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.business_id:
        raise HTTPException(status_code=400, detail="User does not have an associated business")
    
    db_obj = Offer(**offer_in.model_dump(), business_id=current_user.business_id)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.put("/{offer_id}", response_model=OfferResponse)
async def update_offer(offer_id: int, offer_in: OfferUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Offer).where(Offer.id == offer_id, Offer.business_id == current_user.business_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    update_data = offer_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
        
    await db.commit()
    await db.refresh(db_obj)
    return db_obj
