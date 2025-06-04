import { useState } from "react"
import { Box } from "@mui/material"
import ChecklistItem from "./checkListItem";

const PIECES = [
  "IN00002-01",
  "IN00002-07",
  "IN00006-01",
  "IN00006-06",
  "IN00006-20",
  "IN00007-19",
  "IN00009-14",
  "IN00009-19",
  "IN00010-01",
  "IN00014-07",
  "IN00016-05",
  "IN00017-07",
  "IN00017-08",
  "IN00021-11",
  "IN00022-01",
  "IN00022-18",
  "IN00031-02",
  "IN00044-05",
  "IN00069-06",
  "IN00070-06",
];

type PieceState = { checked: boolean; qty: number | "" }
const defaultState: PieceState = { checked: false, qty: 0 }

const chunkArray = <T,>(arr: T[], size: number) =>
  arr.reduce<T[][]>((chunks, item, idx) => {
    if (idx % size === 0) chunks.push([])
    chunks[chunks.length - 1].push(item)
    return chunks
  }, [])

interface PiecesProps {
  selectedProduct: string
}

export default function PiecesList({ selectedProduct }: PiecesProps) {
  const [pieces, setPieces] = useState<Record<string, PieceState>>({})

  const getPiece = (label: string) => pieces[label] ?? defaultState

  const updatePiece = (label: string, data: Partial<PieceState>) =>
    setPieces((prev) => ({
      ...prev,
      [label]: { ...getPiece(label), ...data },
    }))

  const groups = chunkArray(PIECES, 5)

  return (
    <Box sx={{ width: "100%", mt: 4, display: "flex", flexDirection: { xs: "column", lg: "row"}, gap: 2, justifyContent: "center" }}>
        {selectedProduct && (
            groups.map((group, gIdx) => (
                <Box
                key={gIdx}
                sx={{
                    mb: 3,
                    p: 2,
                    border: "1px solid rgb(0, 0, 0)",
                    borderRadius: 1,
                    bgcolor: "#f0f0f0",
                }}
                >
                {group.map((label) => {
                    const { checked, qty } = getPiece(label)
                    return (
                    <ChecklistItem
                        key={label}
                        label={label}
                        checked={checked}
                        quantity={qty}
                        onCheckedChange={(c) => updatePiece(label, { checked: c })}
                        onQuantityChange={(q) => updatePiece(label, { qty: q })}
                    />
                    )
                })}
                </Box>
            ))
        )}
    </Box>
  )
}