from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class Investment(Base):
    __tablename__ = "investments"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, nullable=False)
    asset_type = Column(String, nullable=False)
    units = Column(Float, nullable=False)
    avg_buy_price = Column(Float, nullable=False)
    cost_basis = Column(Float, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
