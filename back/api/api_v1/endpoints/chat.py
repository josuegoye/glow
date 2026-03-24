from fastapi import APIRouter, Depends, HTTPException
from schemas.chat import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/{business_slug}", response_model=ChatResponse)
async def chat_with_glow(business_slug: str, chat_request: ChatRequest):
    # Mocking real OpenAI API response
    # In a real scenario, this would contact OpenAI API with the business' pre-configured context
    last_message = ""
    if chat_request.messages:
        last_message = chat_request.messages[-1].get("content", "").lower()
    
    bot_reply = "Entiendo. ¿En qué más puedo ayudarte?"
    
    if "oferta" in last_message or "precio" in last_message:
        bot_reply = "Puedes ver todas nuestras ofertas activas clickeando en el botón 'Ver ofertas' en mi menú principal."
    elif "sorteo" in last_message:
        bot_reply = "Tenemos un sorteo mensual. Puedes anotarte dejando tu WhatsApp en 'Participar sorteo'."
    elif "horario" in last_message:
        bot_reply = "Para ver nuestros horarios actualizados, revisa la sección 'Horarios'."
        
    return {"response": bot_reply}
