from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.investment import Investment

router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"]
)


@router.get("/summary")
def portfolio_summary(db: Session = Depends(get_db)):
    investments = db.query(Investment).all()

    total_invested = 0
    current_value = 0
    assets = []

    for inv in investments:
        invested = inv.units * inv.avg_buy_price
        market_value = inv.units * (inv.last_price or inv.avg_buy_price)

        total_invested += invested
        current_value += market_value

        assets.append({
            "symbol": inv.symbol,
            "units": inv.units,
            "invested": invested,
            "current_value": market_value
        })

    return {
        "total_invested": total_invested,
        "current_value": current_value,
        "assets": assets
    }


@router.get("/valuation")
def portfolio_valuation(db: Session = Depends(get_db)):
    investments = db.query(Investment).all()

    total_invested = 0
    current_value = 0

    for inv in investments:
        total_invested += inv.units * inv.avg_buy_price
        current_value += inv.units * inv.last_price

    profit_loss = current_value - total_invested

    return {
        "total_invested": total_invested,
        "current_value": current_value,
        "profit_loss": profit_loss
    }