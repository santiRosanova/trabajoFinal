import { Typography } from "@mui/material";

export default function Header() {
  return (
    <>
      <img
        src="src/assets/rasti_logo.png"
        alt="RASTI S.A. Logo"
        style={{
          width: '250px',
          height: 'auto',
          marginBottom: '20px'
        }}
      />
      <Typography variant="h3" sx={{ color: '#333', textAlign: 'center' }}>
        RASTI S.A. CONTROL DE EMBOLSADO
      </Typography>
      <Typography variant="h4" sx={{ color: "#333", mt: 2, textAlign: 'center', fontSize: '1.8rem' }}>
        Sistema de validación de piezas antes del embolsado
      </Typography>
    </>
  );
}