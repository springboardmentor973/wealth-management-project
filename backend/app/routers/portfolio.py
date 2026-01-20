from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.investment import Investment
from app.models.transaction import Transaction
from app.schemas.investment import InvestmentCreate
from app.schemas.transaction import TransactionCreate
from app.dependencies import get_current_user

router = APIRouter(prefix="/portfolio", tags=["Portfolio"])


# -------------------------------
# Create Investment
# -------------------------------
@router.post("/investments")
def create_investment(
    investment: InvestmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    new_inv = Investment(
        user_id=current_user.id,
        **investment.dict()
    )
    db.add(new_inv)
    db.commit()
    db.refresh(new_inv)
    return new_inv


# -------------------------------
# Get all investments for user
# -------------------------------
@router.get("/investments")
def get_investments(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return db.query(Investment).filter(
        Investment.user_id == current_user.id
    ).all()


# -------------------------------
# Update Investment
# -------------------------------
@router.put("/investments/{investment_id}")
def update_investment(
    investment_id: int,
    investment: InvestmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    inv = db.query(Investment).filter_by(
        id=investment_id,
        user_id=current_user.id
    ).first()

    if not inv:
        raise HTTPException(status_code=404, detail="Investment not found")

    for key, value in investment.dict().items():
        setattr(inv, key, value)

    db.commit()
    db.refresh(inv)
    return inv


# -------------------------------
# Delete Investment
# -------------------------------
@router.delete("/investments/{investment_id}")
def delete_investment(
    investment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    inv = db.query(Investment).filter_by(
        id=investment_id,
        user_id=current_user.id
    ).first()

    if not inv:
        raise HTTPException(status_code=404, detail="Investment not found")

    db.delete(inv)
    db.commit()
    return {"message": "Investment deleted"}


# -------------------------------
# Add Transaction
# -------------------------------
@router.post("/transactions")
def add_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    investment = db.query(Investment).filter_by(
        id=transaction.investment_id,
        user_id=current_user.id
    ).first()

    if not investment:
        raise HTTPException(status_code=404, detail="Investment not found")

    # Buy transaction
    if transaction.transaction_type == "buy":
        total_cost = (
            investment.quantity * investment.avg_price +
            transaction.quantity * transaction.price
        )
        investment.quantity += transaction.quantity
        investment.avg_price = total_cost / investment.quantity

    # Sell transaction
    elif transaction.transaction_type == "sell":
        if transaction.quantity > investment.quantity:
            raise HTTPException(status_code=400, detail="Insufficient quantity")
        investment.quantity -= transaction.quantity

    new_tx = Transaction(
        user_id=current_user.id,
        **transaction.dict()
    )

    db.add(new_tx)
    db.commit()
    db.refresh(new_tx)
    db.refresh(investment)
    return {"message": "Transaction recorded"}


# -------------------------------
# Portfolio Summary
# -------------------------------
# -------------------------------
# Portfolio Summary
# -------------------------------
@router.get("/summary")
def portfolio_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    investments = db.query(Investment).filter(
        Investment.user_id == current_user.id
    ).all()

    if not investments:
        return {
            "total_invested": 0,
            "cost_basis": 0,
            "current_value": 0,
            "positions": []
        }

    total_invested = 0
    current_value = 0
    positions = []

    for inv in investments:
        if inv.last_price is None:
            raise HTTPException(
                status_code=400,
                detail=f"Market price not available for {inv.symbol}"
            )

        invested = inv.quantity * inv.avg_price
        market_value = inv.quantity * inv.last_price

        total_invested += invested
        current_value += market_value

        positions.append({
            "symbol": inv.symbol,
            "units": inv.quantity,
            "value": round(market_value, 2)
        })

    return {
        "total_invested": round(total_invested, 2),
        "cost_basis": round(total_invested, 2),
        "current_value": round(current_value, 2),
        "positions": positions
    }
