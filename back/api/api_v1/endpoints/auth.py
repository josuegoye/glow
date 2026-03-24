from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.session import get_db
from models.user import User
from schemas.user import Token
from core.security import verify_password, create_access_token

router = APIRouter()

@router.post("/login/access-token", response_model=Token)
async def login_access_token(db: AsyncSession = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalars().first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    return {
        "access_token": create_access_token(user.id),
        "token_type": "bearer",
    }
