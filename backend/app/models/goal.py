from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

def get_base():
<<<<<<< HEAD
    from app.database import Base
=======
    from app.base import Base
>>>>>>> 7fc715a18a819aef3f15b9da68e64c236fe4846f
    return Base

class Goal(get_base()):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    goal_type = Column(String, nullable=False)
    target_amount = Column(Float, nullable=False)
    target_date = Column(Date, nullable=False)
    monthly_contribution = Column(Float, nullable=False)
    current_amount = Column(Float, default=0, nullable=False)
    progress_percent = Column(Float, default=0)
    status = Column(String, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
