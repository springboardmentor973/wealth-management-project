import sys
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
APP_DIR = os.path.join(BASE_DIR, "app")

sys.path.insert(0, BASE_DIR)
sys.path.insert(0, APP_DIR)

import random
from app.database import SessionLocal
from app.models.investment import Investment


def get_market_price(symbol: str) -> float:
    return round(random.uniform(100, 1000), 2)


def refresh_prices():
    db = SessionLocal()
    try:
        investments = db.query(Investment).all()
        print(f"Found {len(investments)} investments")

        for inv in investments:
            price = get_market_price(inv.symbol)
            inv.last_price = price
            print(f"Updated {inv.symbol} -> {price}")

        db.commit()
        print("Price refresh completed successfully")

    except Exception as e:
        print("Error during price refresh:", e)
        db.rollback()

    finally:
        db.close()


if __name__ == "__main__":
    refresh_prices()