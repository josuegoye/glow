from fastapi import APIRouter
from api.api_v1.endpoints import auth, business, offer, raffle, contact, game, config, chat, public, admin

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(business.router, prefix="/business", tags=["business"])
api_router.include_router(offer.router, prefix="/offers", tags=["offers"])
api_router.include_router(raffle.router, prefix="/raffles", tags=["raffles"])
api_router.include_router(contact.router, prefix="/contacts", tags=["contacts"])
api_router.include_router(game.router, prefix="/game", tags=["game"])
api_router.include_router(config.router, prefix="/config", tags=["config"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(public.router, prefix="/public", tags=["public"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
