from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func

from db.session import get_db
from models.user import User
from models.business import Business
from models.offer import Offer
from api.deps import get_current_user

router = APIRouter()

@router.get("/metrics")
async def get_ceo_metrics(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Simple metrics for demo CEO dashboard
    result = await db.execute(select(func.count(Business.id)))
    active_businesses = result.scalars().first()
    
    # Just returning mock data for complex aggregations for the demo dashboard
    return {
        "active_businesses": active_businesses,
        "mrr": 3980000,
        "churn": 6.3,
        "clients_at_risk": 12,
        "average_ticket": 31100,
        "offer_clicks": 1284
    }
