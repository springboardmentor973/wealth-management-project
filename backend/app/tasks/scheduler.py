from apscheduler.schedulers.background import BackgroundScheduler
from app.tasks.price_refresh import refresh_prices


scheduler = BackgroundScheduler()
scheduler.add_job(refresh_prices, "interval", minutes=30)
scheduler.start()
