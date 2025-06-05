import { useState, useEffect } from "react"
import { Box, Button, CircularProgress } from "@mui/material"
import { CloudUpload } from "@mui/icons-material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { uploadImage } from "../api_services/prediction_service"

export default function UploadPhotoButton() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [annotated, setAnnotated] = useState<string | null>(null)
  const [isProcessingLocal, setIsProcessingLocal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [imageValidated, setImageValidated] = useState(false)

  /* vista previa local */
  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(null)
    const f = e.target.files?.[0]
    if (!f) return
    setIsProcessingLocal(true)
    setFile(f)
    setImageValidated(false)
    setAnnotated(null)
  }

  const handleValidate = async () => {
    if (!file) return
    setIsProcessing(true)
    try {
      const res = await uploadImage(file)
      setAnnotated(res.annotated_image_b64)
      // si necesitás el conteo, lo tenés en res.quantity_per_class
      setImageValidated(true)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
      {/* selector */}
      <Box>
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          hidden
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <Button variant="outlined" component="span" startIcon={<CloudUpload />} sx={btnStyle}>
            Seleccionar Imagen
          </Button>
        </label>
      </Box>

      {/* preview local + spinner de subida */}
      <Box>
        {isProcessingLocal && <CircularProgress color="inherit" sx={{ mt: 2 }} />}
        {preview && 
            <img src={preview} 
            onLoad={() => setIsProcessingLocal(false)} 
            style={{ maxHeight: 500, objectFit: "contain" }} 
            />
        }
      </Box>

      {/* botón validar */}
      <Box>
        {file && !isProcessingLocal && (
          <Button variant="outlined" onClick={handleValidate} sx={validateBtnStyle}>
            Validar Imagen
          </Button>
        )}
      </Box>

      {/* resultado: spinner mientras espera y luego imagen anotada */}
      <Box>
        {isProcessing && imageValidated === false && <CircularProgress color="inherit" sx={{ mt: 0 }} />}

        {imageValidated && annotated && !isProcessing && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={`data:image/jpeg;base64,${annotated}`}
              style={{ maxHeight: 500, objectFit: "contain" }}
            />
            <CheckCircleIcon color="success" sx={{ fontSize: "6rem" }} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

/* estilos */
const btnStyle = {
  backgroundColor: "#f0f0f0",
  color: "#000",
  textTransform: "none",
  px: 2,
  borderRadius: 1,
  borderColor: "#000",
  width: "14rem",
  fontSize: "1.2rem",
}

const validateBtnStyle = {
  ...btnStyle,
  color: "#1c7537",
  borderColor: "#1c7537",
  fontWeight: "bold",
}