from typing import Dict
from collections import Counter
from io import BytesIO
from base64 import b64decode

from PIL import Image
from inference_sdk import InferenceHTTPClient

from app.config import settings

class PredictionService:
    def __init__(self) -> None:
        self.client = InferenceHTTPClient(
            api_url=settings.roboflow_url,
            api_key=settings.roboflow_key,
        )
        self.workspace = settings.roboflow_workspace
        self.workflow = settings.roboflow_workflow

    def run(self, image_bytes: bytes) -> Dict:
        """Ejecuta el workflow y devuelve imagen anotada (base64) + conteos."""
        pil_img = Image.open(BytesIO(image_bytes))

        result = self.client.run_workflow(
            workspace_name=self.workspace,
            workflow_id=self.workflow,
            images={"image": pil_img},
            parameters={"confidence": 0.6, "overlap": 0.8},
            use_cache=True,
        )

        return self._parse_result(result)

    @staticmethod
    def _parse_result(result):
        data = result[0]

        # Imagen con bounding-boxes en base64
        annotated_b64 = data["output_image"]

        # Conteo por clase
        preds = data.get("predictions", {}).get("predictions", [])
        quantity_per_class = dict(Counter(p["class"] for p in preds))

        return {
            "annotated_image_b64": annotated_b64,
            "quantity_per_class": quantity_per_class,
        }

# -------- helper para FastAPI --------
from fastapi import Depends

def get_prediction_service() -> "PredictionService":
    return PredictionService()