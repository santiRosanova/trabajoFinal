import { Box } from "@mui/material"
import { useState } from "react"
import Header from "./components/header"
import Selector from "./components/selector"
import PiecesList from "./components/pieces_list"
import UploadPhotoButton from "./components/uploadPhoto"
import ValidationPanel from "./components/validation_panel"

type PieceState = { checked: boolean; qty: number }

export default function ComputerVisionDemo() {

  const [product, setProduct] = useState("")

  const [pieces, setPieces] = useState<Record<string, PieceState>>({})

  const [backendCounts, setBackendCounts] = useState<Record<string, number> | null>(null)

  const updatePiece = (label: string, data: Partial<PieceState>) =>
    setPieces((prev) => ({
      ...prev,
      [label]: { ...prev[label], ...data },
    }))

  return (
    <Box component="main" sx={{ minHeight: "100svh", bgcolor: "#f0f0f0", p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Header />
        <Selector productSetter={setProduct} />

        <PiecesList
          selectedProduct={product}
          pieces={pieces}
          updatePiece={updatePiece}
        />
      </Box>

      {product && (
        <Box sx={{ mt: 2, ml: { xs: 0, lg: 35 } }}>
          <UploadPhotoButton
            onValidated={(res) => setBackendCounts(res.quantity_per_class)}
          />
        </Box>
      )}

      {backendCounts && (
        <ValidationPanel selected={pieces} detected={backendCounts} />
      )}
    </Box>
  )
}