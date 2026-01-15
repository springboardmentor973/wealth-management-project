from fastapi import APIRouter, Depends, HTTPException, status
from core.security import get_current_user

###
#  Actual router (token is required to access)
# router = APIRouter(
#     prefix='/progress',
#     dependencies=[Depends(get_current_user)]
# )
###

router = APIRouter(
    prefix='/progress',
)

@router.get('/')
def return_progress():
    current_amount = 1000 # get from db or somewhere
    target_amount = 2000 # get from db or somewhere
    if current_amount < 0 or current_amount > target_amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current amount out of bound"
        )
    elif target_amount < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Negative target amount"
        )
    else: 
        progress_percent = (current_amount/target_amount) * 100
        return {"progress_percent" : progress_percent}