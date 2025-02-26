"use client"; 

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material"
import { Save as SaveIcon } from "@mui/icons-material"
import Sidebar from "../../components/sidebar"
import { keyframes } from "@emotion/react"
import PesagemService from "../../service/pesagemapi";


const PesagemForm = () => {
  const [formData, setFormData] = useState({
    data: "",
    prefixo: "",
    motorista: "",
    cooperativa: "",
    tipo_veiculo: "",
    volume_carga: "",
    peso_calculado: "",
  })

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
   
    const dataFormatada = new Date(formData.data).toISOString()
  
    const dadosFormatados = {
        ...formData,
        data: dataFormatada,
        volume_carga: parseFloat(formData.volume_carga),
        peso_calculado: parseFloat(formData.peso_calculado),
      }
  
    console.log("Enviando dados:", dadosFormatados) 
  
    try {
        await PesagemService.cadastrarPesagem(dadosFormatados);
      setSnackbar({
        open: true,
        message: "Pesagem registrada com sucesso!",
        severity: "success",
      })
      setFormData({
        data: "",
        prefixo: "",
        motorista: "",
        cooperativa: "",
        tipo_veiculo: "",
        volume_carga: "",
        peso_calculado: "",
      })
    } catch (error) {
      console.error("Erro ao registrar a pesagem:", error.response?.data || error.message)
      setSnackbar({
        open: true,
        message: "Erro ao registrar a pesagem!",
        severity: "error",
      })
    }
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbar((prev) => ({ ...prev, open: false }))
  }
  
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "280px",
          width: "calc(100% - 280px)",
        }}
      >
        <Fade in={true} timeout={1000}>
          <Typography
            variant="h2"
            sx={{
              mb: 16,
              fontWeight: "bold",
              color: "#2c3e50",
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              animation: `${fadeIn} 1s ease-out`,
            }}
          >
            Registrar Nova Pesagem
          </Typography>
        </Fade>

        <Fade in={true} timeout={1500}>
          <Card
            sx={{
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                transform: "translateY(-5px)",
              },
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data"
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Prefixo"
                    name="prefixo"
                    value={formData.prefixo}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Motorista"
                    name="motorista"
                    value={formData.motorista}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cooperativa"
                    name="cooperativa"
                    value={formData.cooperativa}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="tipo-veiculo-label">Tipo de Veículo</InputLabel>
                    <Select
                      labelId="tipo-veiculo-label"
                      name="tipo_veiculo"
                      value={formData.tipo_veiculo}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="">Selecione</MenuItem>
                      <MenuItem value="Basculante">Basculante</MenuItem>
                      <MenuItem value="Selectolix">Selectolix</MenuItem>
                      <MenuItem value="Baú">Baú</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Volume de Carga"
                    name="volume_carga"
                    value={formData.volume_carga}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
  <TextField
    fullWidth
    label="Peso Calculado"
    name="peso_calculado"
    type="number"
    value={formData.peso_calculado}
    onChange={handleChange}
    required
    sx={{ mb: 2 }}
  />
</Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                      mt: 2,
                      bgcolor: "#3f51b5",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#303f9f",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Salvar Pesagem
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Fade>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export default PesagemForm

