import { Router } from "express";

import {
  getCitas,
  createCita,
  getCita,
  updateCita,
  deleteCita,
  getCitasPendPac,
} from "../controllers/citas.controllers.js";

const router = Router();

router.get("/citas/:filtro/:fechaInicial/:fechaFinal", getCitas);

router.get("/cita/:fecha_citaAgen/:horaIni_citaAgen", getCita);

router.post("/createCita", createCita);

router.put("/updateCita/:fecha_citaAgen/:horaIni_citaAgen", updateCita);

router.delete("/deleteCita/:fecha_citaAgen/:horaIni_citaAgen", deleteCita);

//futuras citas
router.get(
  "/pacientes/:id_paciente/citas/:esta_citaAgen/:fechaInicial/:fechaFinal",
  getCitasPendPac
);

export default router;
