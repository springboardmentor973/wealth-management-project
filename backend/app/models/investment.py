from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, DateTime, Enum
from sqlalchemy.sql import func
<<<<<<< HEAD
from app.database import Base
=======
from app.base import Base
>>>>>>> 7fc715a18a819aef3f15b9da68e64c236fe4846f
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
