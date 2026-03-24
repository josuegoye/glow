from pydantic import BaseModel
from typing import Optional

class ModuleConfigBase(BaseModel):
    offers: Optional[bool] = True
    raffle: Optional[bool] = True
    chat: Optional[bool] = True
    game: Optional[bool] = True
    qr: Optional[bool] = True
    terms: Optional[bool] = True
    schedule: Optional[bool] = True
    location: Optional[bool] = True
    whatsapp: Optional[bool] = True

class ModuleConfigUpdate(ModuleConfigBase):
    pass

class ModuleConfigResponse(ModuleConfigBase):
    id: int
    business_id: int

    class Config:
        from_attributes = True

class TermsBase(BaseModel):
    content: Optional[str] = None

class TermsUpdate(TermsBase):
    pass

class TermsResponse(TermsBase):
    id: int
    business_id: int

    class Config:
        from_attributes = True
