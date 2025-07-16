from fastapi import APIRouter, UploadFile, File, Depends

from app.services.prediction_service import (
    PredictionService,
    get_prediction_service,
)

router = APIRouter(tags=["vision"])

@router.post("/validateImage")
async def validateImage(
    image: UploadFile = File(...),
    svc: PredictionService = Depends(get_prediction_service),
):
    img_bytes = await image.read()
    result = svc.run(img_bytes)
    return result