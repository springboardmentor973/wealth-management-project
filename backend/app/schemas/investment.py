from pydantic import BaseModel

class InvestmentCreate(BaseModel):
    symbol: str
    asset_type: str
    units: float
    avg_buy_price: float
    cost_basis: float
    user_id: int

class InvestmentResponse(InvestmentCreate):
    id: int

    class Config:
        orm_mode = True
