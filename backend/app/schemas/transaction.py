from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TransactionBase(BaseModel):
    symbol: str
    type: str
    quantity: Optional[float] = None
    price: Optional[float] = None
    fees: Optional[float] = None


class TransactionCreate(TransactionBase):
    user_id: int


class TransactionResponse(TransactionBase):
    id: int
    executed_at: datetime
    user_id: int

    class Config:
        from_attributes = True
