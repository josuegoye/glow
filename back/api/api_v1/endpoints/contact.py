from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from db.session import get_db
from models.contact import Contact
from models.user import User
from schemas.contact import ContactCreate, ContactResponse, ContactUpdate
from api.deps import get_current_user

router = APIRouter()

@router.get("/", response_model=List[ContactResponse])
async def read_contacts(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Contact).where(Contact.business_id == current_user.business_id))
    return result.scalars().all()

@router.post("/", response_model=ContactResponse)
async def create_contact(contact_in: ContactCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_obj = Contact(**contact_in.model_dump(), business_id=current_user.business_id)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.put("/{contact_id}", response_model=ContactResponse)
async def update_contact(contact_id: int, contact_in: ContactUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Contact).where(Contact.id == contact_id, Contact.business_id == current_user.business_id))
    db_obj = result.scalars().first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    update_data = contact_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
        
    await db.commit()
    await db.refresh(db_obj)
    return db_obj
