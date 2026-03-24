import asyncio
import os
import sys
from sqlalchemy.ext.asyncio import AsyncSession

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from db.session import AsyncSessionLocal, engine
from models.user import User, RoleEnum
from models.business import Business, ModuleConfig
from models.offer import Offer
from core.security import get_password_hash

async def seed():
    async with AsyncSessionLocal() as db:
        # Create a test CEO admin
        admin = User(
            email="ceo@glow.com",
            password_hash=get_password_hash("admin123"),
            role=RoleEnum.ADMIN
        )
        db.add(admin)
        
        # Create a test business
        biz = Business(
            slug="glow-cooperativa-centro",
            name="Glow Cooperativa Centro",
            phone="5492345000000",
            schedule="09:00 a 20:00",
            location_url="https://maps.google.com",
            plan_type="Growth"
        )
        db.add(biz)
        await db.flush() # flush to get biz.id
        
        # Create business owner user
        owner = User(
            email="owner@glow.com",
            password_hash=get_password_hash("owner123"),
            role=RoleEnum.BUSINESS,
            business_id=biz.id
        )
        db.add(owner)
        
        # Modules
        modules = ModuleConfig(business_id=biz.id)
        db.add(modules)
        
        # Offers
        offers = [
            Offer(business_id=biz.id, name="Producto 1", price="$9.900", note="Oferta destacada"),
            Offer(business_id=biz.id, name="Producto 2", price="$14.500", note="Oferta destacada"),
            Offer(business_id=biz.id, name="Producto 3", price="$6.750", note="Oferta destacada")
        ]
        db.add_all(offers)
        
        await db.commit()
        print("Database seeded completely!")

if __name__ == "__main__":
    asyncio.run(seed())
