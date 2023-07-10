import { Router } from "express";

import {
  getAllPacientes,
  getNombreCedula,
  getPacienteID,
  createPaciente,
  deletePaciente,
  updatePaciente,
} from "../controllers/pacientes.controllers.js";

import {
  getAntecedentes,
  createAntecedente,
  updateAntecedente,
  deleteAntecedente,
} from "../controllers/antecedentes.controllers.js";

//router
const router = Router();

//pacientes
router.get("/getPacientes", getAllPacientes);
router.get("/paciente/:id_paciente", getPacienteID);
router.get("/buscarPaciente/:nombreCedula", getNombreCedula);
router.post("/createPaciente", createPaciente);
router.put("/updatePaciente/:id_paciente", updatePaciente);
router.delete("/deletePaciente/:id_paciente", deletePaciente);

//antecedentes
router.get("/paciente/:id_paciente/getAntecedentes/:tipo", getAntecedentes);
router.post("/paciente/:id_paciente/createAntecedente", createAntecedente);
router.put("/paciente/updateAntecedente/:id_antecedente", updateAntecedente);
router.delete("/paciente/deleteAntecedente/:id_antecedente", deleteAntecedente);
//
export default router;
