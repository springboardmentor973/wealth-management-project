from fastapi import APIRouter, Depends   # Import APIRouter to create grouped APIs
from core.security import get_current_user

# Create a router object for portfolio-related APIs
router = APIRouter(
    prefix ="/portfolio", 
    tags = ["Portfolio"],
    dependencies = [Depends(get_current_user)]
)

# This API handles GET requests at /portfolio/summary
@router.get("/summary")
def portfolio_summary():
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

    # Loop through each asset in the portfolio
    for item in assets:

        # Calculate invested amount for one asset
        # Formula: quantity × price
        invested_amount = item["quantity"] * item["price"]

        # Add this asset's investment to total invested amount
        total_invested += invested_amount

        # Store asset-wise investment details
        per_asset.append({
            "asset": item["asset"],              # Asset name
            "quantity": item["quantity"],        # Units purchased
            "invested_amount": invested_amount   # Total invested for this asset
        })

    # Final response 
    response = {
        "total_invested": total_invested,           # Sum of all investments
        "cost_basis": total_invested,                # Same as invested (simple version)
        "current_value": total_invested + 5000,      # Mock current value (placeholder)
        "per_asset": per_asset                       # Asset-wise breakdown
    }

    # Return response as JSON
    return response
