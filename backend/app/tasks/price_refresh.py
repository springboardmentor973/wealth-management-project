import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from datetime import datetime
import yfinance as yf

from app.database import SessionLocal
from app.models.investment import Investment


def get_market_price(symbol: str):
    ticker = yf.Ticker(symbol)
    return ticker.info.get("regularMarketPrice")


def refresh_prices():
    db = SessionLocal()
    try:
        investments = db.query(Investment).all()
        print(f"Found {len(investments)} investments")

        for inv in investments:
            price = get_market_price(inv.symbol)
            if price:
                inv.last_price = price
                inv.last_price_at = datetime.utcnow()
                print(f"{inv.symbol} updated → {price}")

        db.commit()
        print("Price refresh completed successfully")

    except Exception as e:
        print("Error during price refresh:", e)
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    refresh_prices()
