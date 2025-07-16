// validation_panel.tsx
import { Box, Chip, Typography, Grid } from "@mui/material"

type PieceState = { checked: boolean; qty: number }

interface Props {
  selected: Record<string, PieceState>
  detected: Record<string, number>
}

export default function ValidationPanel({ selected, detected }: Props) {
  const allLabels = Array.from(
    new Set([
      ...Object.keys(selected).filter((k) => selected[k].checked),
      ...Object.keys(detected),
    ]),
  )

  type Status = "ok" | "missing" | "excess"

  const rows = allLabels.map((label) => {
    const expected = selected[label]?.qty ?? 0
    const found = detected[label] ?? 0
    const status: Status =
      found === expected ? "ok" : found < expected ? "missing" : "excess"
    return { label, expected, found, status }
  })

  const color: Record<Status, "success" | "error" | "warning"> = { ok: "success", missing: "error", excess: "warning" }
  const statusText: Record<Status, string> = { ok: "OK", missing: "FALTANTE", excess: "EXCEDENTE" }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
        Validación automática
      </Typography>

      <Grid container spacing={2}>
        {rows.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.label}>
            <Box
              sx={{
                p: 2,
                border: "2px solid #000",
                borderRadius: 1,
                bgcolor: "#f9f9f9",
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "#000" }}>{r.label}</Typography>
              <Typography variant="body2" sx={{ color: "#000" }}>
                Esperado: {r.expected} – Detectado: {r.found}
              </Typography>
              <Chip
                label={statusText[r.status]}
                color={color[r.status]}
                size="small"
                sx={{ mt: 1, fontWeight: "bold", color: "#f0f0f0" }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}