from fastapi import APIRouter   # Import APIRouter to create grouped APIs

# Create a router object for portfolio-related APIs
router = APIRouter(prefix="/portfolio", tags=["Portfolio"])

# This API handles GET requests at /portfolio/valuation
@router.get("/valuation")
def portfolio_valuation():

    # Each item represents one asset in the portfolio
    assets = [
        {"asset": "AAPL", "quantity": 10, "buy_price": 150, "last_price": 170},
        {"asset": "GOOG", "quantity": 5, "buy_price": 2000, "last_price": 2100},
        {"asset": "TSLA", "quantity": 8, "buy_price": 700, "last_price": 680},
    ]

    total_invested = 0
    current_value = 0

    # Loop through each asset
    for item in assets:
        total_invested += item["quantity"] * item["buy_price"]
        current_value += item["quantity"] * item["last_price"]

    profit_loss = current_value - total_invested

    # Final response
    return {
        "total_invested": total_invested,
        "current_value": current_value,
        "profit_loss": profit_loss
    }
