import { useState } from "react"
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"

interface SelectorProps {
  productSetter: (product: string) => void
}

export default function Selector({ productSetter }: SelectorProps) {
  const [product, setProduct] = useState("")

interface SelectorChangeEvent {
    target: {
        value: string
    }
}

const handleChange = (event: SelectorChangeEvent) => 
    {
        setProduct(event.target.value)
        productSetter(event.target.value)
    }

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <FormControl
        variant="outlined"
        sx={{
          minWidth: 260,
          bgcolor: "#f0f0f0",
          borderRadius: 1,
        }}
      >
        <InputLabel id="product-label" sx={{ color: "#333" }}>
          Selecciona el producto
        </InputLabel>

        <Select
          labelId="product-label"
          value={product}
          label="Seleccioná el producto"
          onChange={handleChange}
          sx={{
            "& .MuiSelect-select": {
              color: "#333",
            },
            "& fieldset": {
              borderColor: "#9e9e9e",
            },
            "&:hover fieldset": {
              borderColor: "#555",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#000",
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#000',
            }
          }}
        >
          <MenuItem value="">
            <em>Ninguno</em>
          </MenuItem>
          <MenuItem value="Blocky Chicas Veterinaria">Blocky Chicas Veterinaria</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}