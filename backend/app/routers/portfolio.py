from fastapi import APIRouter, Depends   # Import APIRouter to create grouped APIs
from app.core.security import get_current_user
from sqlalchemy.orm import Session
from app.models.goal import Goal

from app.database import get_db
from app.models.investment import Investment
from app.schemas.goal import DashboardSummaryResponse


# Create a router object for portfolio-related APIs
router = APIRouter(
    prefix ="/portfolio", 
    tags = ["Portfolio"],
)

# This API handles GET requests at /portfolio/summary
@router.get("/summary")
def portfolio_summary(current_user : dict = Depends(get_current_user), db: Session = Depends(get_db)):
    investments = db.query(Investment).all()
    # Each item represents one asset in the portfolio
    assets = [
        {"asset": "AAPL", "quantity": 10, "price": 150},   # Apple stock
        {"asset": "GOOG", "quantity": 5, "price": 2000},   # Google stock
        {"asset": "TSLA", "quantity": 8, "price": 700},    # Tesla stock
    ]

    # List to store per-asset aggregation results
    per_asset = []

    # Variable to store total invested amount
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
def portfolio_valuation(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
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

@router.get("/dashboard", response_model=DashboardSummaryResponse)
def portfolio_dashboard(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    goals = db.query(Goal).all()
    investments = db.query(Investment).all()

    total_net_worth = 0
    for inv in investments:
        price = inv.last_price or inv.avg_buy_price
        total_net_worth += inv.units * price

    active_goals = len(
        [g for g in goals if g.current_amount < g.target_amount]
    )

    return {
        "total_net_worth": total_net_worth,
        "active_goals": active_goals
    }
