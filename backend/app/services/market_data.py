def get_latest_price(symbol: str):
    mock_prices = {
        "AAPL": 180.50,
        "GOOG": 140.20,
        "TSLA": 250.75
    }

    price = mock_prices.get(symbol.upper(), 100.00)
    print(f"Price for {symbol}: {price}")
    return price
