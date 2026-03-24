from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.session import get_db
from models.business import ModuleConfig, Terms
from models.user import User
from schemas.config import ModuleConfigResponse, ModuleConfigUpdate, TermsResponse, TermsUpdate
from api.deps import get_current_user

router = APIRouter()

@router.get("/modules", response_model=ModuleConfigResponse)
async def read_module_config(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(ModuleConfig).where(ModuleConfig.business_id == current_user.business_id))
    config = result.scalars().first()
    if not config:
        config = ModuleConfig(business_id=current_user.business_id)
        db.add(config)
        await db.commit()
        await db.refresh(config)
    return config

@router.put("/modules", response_model=ModuleConfigResponse)
async def update_module_config(config_in: ModuleConfigUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(ModuleConfig).where(ModuleConfig.business_id == current_user.business_id))
    db_obj = result.scalars().first()
    if not db_obj:
        db_obj = ModuleConfig(business_id=current_user.business_id)
        db.add(db_obj)
        
    update_data = config_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
        
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

@router.get("/terms", response_model=TermsResponse)
async def read_terms(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Terms).where(Terms.business_id == current_user.business_id))
    terms = result.scalars().first()
    if not terms:
        terms = Terms(business_id=current_user.business_id)
        db.add(terms)
        await db.commit()
        await db.refresh(terms)
    return terms

@router.put("/terms", response_model=TermsResponse)
async def update_terms(terms_in: TermsUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Terms).where(Terms.business_id == current_user.business_id))
    db_obj = result.scalars().first()
    if not db_obj:
        db_obj = Terms(business_id=current_user.business_id)
        db.add(db_obj)
        
    update_data = terms_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
        
    await db.commit()
    await db.refresh(db_obj)
    return db_obj
