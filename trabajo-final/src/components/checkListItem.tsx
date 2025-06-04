import type { FC, ChangeEvent } from "react"
import { Box, Checkbox, TextField, Typography } from "@mui/material"

interface ChecklistItemProps {
  label: string
  checked: boolean
  quantity: number | ""
  onCheckedChange: (checked: boolean) => void
  onQuantityChange: (qty: number | "") => void
}

const ChecklistItem: FC<ChecklistItemProps> = ({
  label,
  checked,
  quantity,
  onCheckedChange,
  onQuantityChange,
}) => {
  const handleQty = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            return onQuantityChange("")
        }
        if (isNaN(Number(e.target.value))) {
            return onQuantityChange("")
        }
        if (Number(e.target.value) < 1) {
            return onQuantityChange(1)
        }
        if (Number(e.target.value) > 100) {
            return onQuantityChange(100)
        }
        else {
            return onQuantityChange(Number(e.target.value))
        }
    }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 1,
      }}
    >
      <Checkbox
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        sx={{
          p: 0.5,
          "&.Mui-checked": { color: "#000" },
        }}
      />

      <Typography
        variant="body1"
        sx={{ flexGrow: 1, color: "#333", userSelect: "none" }}
        onClick={() => onCheckedChange(!checked)}
      >
        {label}
      </Typography>

      <TextField
        size="small"
        value={quantity}
        onChange={handleQty}
        slotProps={{
            htmlInput: { min: 1, max: 100 }
        }}
        sx={{ width: 80, ml: 1 }}
        disabled={!checked}
      />
    </Box>
  )
}

export default ChecklistItem