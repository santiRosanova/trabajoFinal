import { CloudUpload } from "@mui/icons-material"
import { Box, Button, CircularProgress } from "@mui/material"
import { useState } from "react"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function UploadPhotoButton() {

    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [imageValidated, setImageValidated] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsProcessing(true)
      setUploadedImage(null)
      const file = event.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setIsProcessing(false)
        setImageValidated(false)
      }
      reader.readAsDataURL(file)
    }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', gap: 4}} >
        <Box>
            <input
                accept="image/*"
                id="image-upload"
                type="file"
                hidden
                onChange={handleImageUpload}
                style={{ display: 'none' }}
            />
            <label htmlFor="image-upload">
            <Button variant="outlined" component="span" startIcon={<CloudUpload/>} 
                sx={{
                    backgroundColor: '#f0f0f0',
                    color: '#000',
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 1,
                    borderColor: '#000',
                    borderWidth: 1,
                    width: '14rem',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                }}>
                Seleccionar Imagen a Validar
            </Button>
            </label>
        </Box>
        <Box>
            {uploadedImage && (
                <Box>
                    <img
                    src={uploadedImage}
                    alt="Uploaded"
                    style={{ maxHeight: 500, objectFit: "contain"}}
                    />
                </Box>
            )}
            {isProcessing && (
                <CircularProgress color="inherit" sx={{mt: 3}} />
            )}
        </Box>
        <Box>
            {uploadedImage && !isProcessing && (
            <Button variant="outlined" component="span"
                onClick={() => {
                    setImageValidated(true)
                    // LOGICA DE VALIDACIÓN DE IMAGEN AQUÍ
                }}
                sx={{
                    backgroundColor: '#f0f0f0',
                    color: '#1c7537',
                    textTransform: 'none',
                    padding: '8px 16px',
                    borderRadius: 1,
                    borderColor: '#1c7537',
                    borderWidth: 2,
                    width: '14rem',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                }}>
                Validar Imagen
            </Button>
            )}
        </Box>
        <Box>
            {uploadedImage && imageValidated && (
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2}}>
                    <Box>
                        <img
                        src={"src/assets/result.jpg"}
                        alt="Uploaded"
                        style={{ maxHeight: 500, objectFit: "contain"}}
                        />
                    </Box>
                    <CheckCircleIcon color="success" sx={{fontSize: '6rem'}}/>
                </Box>
            )}
        </Box>
    </Box>
  );
}