from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.session import get_db
from models.business import Business, ModuleConfig, Terms
from models.offer import Offer
from models.raffle import Raffle
from models.game import GameConfig, GameSpin
from schemas.business import BusinessResponse
from pydantic import BaseModel
import random

router = APIRouter()

@router.get("/{slug}")
async def get_public_assistant_data(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Business).where(Business.slug == slug))
    business = result.scalars().first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
        
    modules_result = await db.execute(select(ModuleConfig).where(ModuleConfig.business_id == business.id))
    modules = modules_result.scalars().first()
    modules_dict = {
        k: getattr(modules, k) for k in ["offers", "raffle", "chat", "game", "qr", "terms", "schedule", "location", "whatsapp"]
    } if modules else {}
    
    offers_result = await db.execute(select(Offer).where(Offer.business_id == business.id, Offer.status == 'active'))
    offers = offers_result.scalars().all()
    
    game_result = await db.execute(select(GameConfig).where(GameConfig.business_id == business.id))
    game = game_result.scalars().first()
    
    raffle_result = await db.execute(select(Raffle).where(Raffle.business_id == business.id, Raffle.status == 'open'))
    raffle = raffle_result.scalars().first()
    
    terms_result = await db.execute(select(Terms).where(Terms.business_id == business.id))
    terms = terms_result.scalars().first()
    
    return {
        "business": {
            "name": business.name,
            "phone": business.phone,
            "schedule": business.schedule,
            "location_url": business.location_url
        },
        "modules": modules_dict,
        "offers": [{"name": o.name, "price": o.price, "note": o.note} for o in offers],
        "game": {
            "title": game.title if game else "Girar Glow",
            "rule": game.rule if game else "",
            "messages": {
                "winner": game.winner_message if game else "Ganaste!",
                "loser": game.loser_message if game else "Sigue intentando"
            }
        } if modules_dict.get('game') else None,
        "raffle": {
            "id": raffle.id,
            "title": raffle.title,
            "prize": raffle.prize,
            "description": raffle.description
        } if raffle and modules_dict.get('raffle') else None,
        "terms": terms.content if terms else "Términos por defecto del negocio."
    }

class SpinRequest(BaseModel):
    phone: str

@router.post("/{slug}/spin")
async def play_spin(slug: str, req: SpinRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Business).where(Business.slug == slug))
    business = result.scalars().first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
        
    game_result = await db.execute(select(GameConfig).where(GameConfig.business_id == business.id))
    game = game_result.scalars().first()
    
    # 30% chance for demo
    won = random.random() < 0.3
    prize_name = game.rule if (won and game) else None
    
    spin = GameSpin(
        business_id=business.id,
        phone=req.phone,
        won=won,
        prize_name=prize_name
    )
    db.add(spin)
    await db.commit()
    
    msg = (game.winner_message if game else "¡Ganaste!") if won else (game.loser_message if game else "No ganaste esta vez.")
        
    return {"won": won, "message": msg, "prize": prize_name}
