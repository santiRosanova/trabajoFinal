import { Box } from "@mui/material"
import { useState } from "react";
import Header from "./components/header";
import Selector from "./components/selector";
import PiecesList from "./components/pieces_list";
import UploadPhotoButton from "./components/uploadPhoto";

export default function ComputerVisionDemo() {

  const [product, setProduct] = useState("");
  
  return (
    <Box component="main" sx={{ minHeight: "100svh", bgcolor: '#f0f0f0', p: 3}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
        <Header/>
        <Selector productSetter={setProduct}/>
        <PiecesList selectedProduct={product}/>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2, ml: {xs: 0, lg: 35}}}>
        { product && (
          <UploadPhotoButton/>
        )}
      </Box>
    </Box>
  );
}