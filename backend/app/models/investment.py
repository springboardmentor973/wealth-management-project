from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, DateTime, Enum
from sqlalchemy.sql import func
from app.database import Base
import enum

class AssetType(enum.Enum):
    stock = "stock"
    etf = "etf"
    mutual_fund = "mutual_fund"
    bond = "bond"
    cash = "cash"

class Investment(Base):
    __tablename__ = "investments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    asset_type = Column(Enum(AssetType), nullable=False)
    symbol = Column(String, nullable=True)

    units = Column(Numeric, nullable=False)
    avg_buy_price = Column(Numeric, nullable=False)
    cost_basis = Column(Numeric, nullable=False)

    current_value = Column(Numeric, nullable=True)
    last_price = Column(Numeric, nullable=True)
    last_price_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
