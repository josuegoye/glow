from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from db.session import get_db
from models.business import Business
from schemas.business import BusinessCreate, BusinessResponse, BusinessUpdate

router = APIRouter()

@router.get("/", response_model=List[BusinessResponse])
async def read_businesses(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Business))
    return result.scalars().all()

@router.post("/", response_model=BusinessResponse)
async def create_business(business_in: BusinessCreate, db: AsyncSession = Depends(get_db)):
    # Very basic creation, logic for duplicate slugs omitted for simplicity but could be added
    db_obj = Business(**business_in.model_dump())
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.put("/{business_id}", response_model=BusinessResponse)
async def update_business(business_id: int, business_in: BusinessUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Business).where(Business.id == business_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Business not found")
    
    update_data = business_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
        
    await db.commit()
    await db.refresh(db_obj)
    return db_obj
