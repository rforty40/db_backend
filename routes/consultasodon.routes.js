import { Router } from "express";

//Historial y detalle consulta
import {
  getConsultas,
  createConsulta,
  updateConsulta,
  deleteConsulta,
  getDetalleConsulta,
  createSignoVital,
  updateSignoVital,
} from "../controllers/consulta.controllers.js";

//Examenes estomatonagtico
import {
  createExamen,
  updateExamen,
  getEnfermedadesCIE,
  deleteExamen,
  getExamenesConsulta,
} from "../controllers/examenes.controllers.js";

//Planes de Diagnostico
import {
  getPlanesConsulta,
  createPlan,
  updatePlan,
  deletePlan,
} from "../controllers/planes.controllers.js";

//Dignosticos
import {
  getDiagnosConsulta,
  createDiagnos,
  updateDiagnos,
  deleteDiagnos,
} from "../controllers/diagnosticos.controllers.js";

//Tratamientos
import {
  getTratamConsulta,
  createTratam,
  updateTratam,
  deleteTratam,
  createCompli,
  updateCompli,
  deleteCompli,
  createProced,
  deleteProced,
  createPresc,
  updatePresc,
  deletePresc,
} from "../controllers/tratamientos.controllers.js";

//pagos
import {
  getPagosConsulta,
  createIngreso,
  updateIngreso,
  deleteIngreso,
  getSumPagosConsulta,
} from "../controllers/ingresos.controllers.js";

//odontogramas
import {
  createOdont,
  createPzaDental,
  deleteOdont,
  deletePzaDental,
  getAllOdontogramas,
  updatePzaDental,
} from "../controllers/odontograma.controllers.js";

//salud bucal
import {
  createPzaSaludBucal,
  createSaludBucal,
  getAllSaludBucal,
  updatePzaSaludBucal,
  updateSaludBucal,
} from "../controllers/salud_bucal.controllers.js";

//recurso fotograficos
import {
  createFotografia,
  createRecursoFoto,
  deleteFotografia,
  deleteRecursoFoto,
  getAllRecursosFoto,
  updateRecursoFoto,
} from "../controllers/recurso_fotos.controllers.js";

//router
const router = Router();

//historial clinico
router.get(
  "/pacientes/:id_paciente/historial/:filtro/:prm1/:prm2",
  getConsultas
);

//consultas
router.get("/consultas/:id_consulta/detalle/:seccion", getDetalleConsulta);
router.post("/pacientes/:id_paciente/consultas/create", createConsulta);
router.put("/consultas/:id_consulta/update", updateConsulta);
router.delete("/consultas/:id_consulta/delete", deleteConsulta);

//signos vitales
router.post(
  // "/pacientes/:id_paciente/consultas/:id_consulta/signos_vitales/create",
  "/consulta/:id_consulta/signos_vitales/create",
  createSignoVital
);
router.put(
  "/consulta/:id_consulta/signos_vitales/update/:id_signo",
  updateSignoVital
);

//enfermedades CIE
router.get("/enfermedades/:busqueda", getEnfermedadesCIE);

//examenes estomatonagtico
router.get("/consulta/:id_consulta/examenes", getExamenesConsulta);
router.post("/consulta/:id_consulta/examen_esto/create", createExamen);
router.put("/examen_esto/update/:id_examen", updateExamen);
router.delete("/examen_esto/delete/:id_examen", deleteExamen);

//planes diagnostico terapeuticos educacional
router.get("/consulta/:id_consulta/planes", getPlanesConsulta);
router.post("/consulta/:id_consulta/planes/create", createPlan);
router.put("/planes/update/:id_plan", updatePlan);
router.delete("/planes/delete/:id_plan", deletePlan);

//Diagnosticos
router.get("/consulta/:id_consulta/diagnosticos", getDiagnosConsulta);
router.post("/consulta/:id_consulta/diagnosticos/create", createDiagnos);
router.put("/diagnosticos/update/:id_diag", updateDiagnos);
router.delete("/diagnosticos/delete/:id_diag", deleteDiagnos);

//Tratamientos
router.get("/consulta/:id_consulta/tratamientos", getTratamConsulta);
router.post("/consulta/:id_consulta/tratamiento/create", createTratam);
router.put("/tratamiento/update/:id_tratam", updateTratam);
router.delete("/tratamiento/delete/:id_tratam", deleteTratam);

//Complicaciones
router.post("/tratamiento/:id_tratam/complicacion/create", createCompli);
router.put("/complicacion/update/:id_compli", updateCompli);
router.delete("/complicacion/delete/:id_compli", deleteCompli);

//Procedimientos
router.post("/tratamiento/:id_tratam/procedimiento/create", createProced);
router.delete("/tratamiento/procedimiento/delete/:id_proced", deleteProced);

//prescripciones
router.post("/tratamiento/:id_tratam/prescripcion/create", createPresc);
router.put("/prescripcion/update/:id_presc", updatePresc);
router.delete("/prescripcion/delete/:id_presc", deletePresc);

//pagos
router.get("/consulta/:id_consulta/pagos", getPagosConsulta);
router.get("/consulta/:id_consulta/sum_pagos", getSumPagosConsulta);
router.post("/consulta/:id_consulta/pagos/create", createIngreso);
router.put("/pagos/update/:id_ingreso", updateIngreso);
router.delete("/pagos/delete/:id_ingreso", deleteIngreso);

//odontograma
router.get("/odontogramas/:tipo/:id_tipo", getAllOdontogramas);
router.post("/consulta/:id_consulta/odontograma/create", createOdont);
router.delete("/odontograma/delete/:id_odonto", deleteOdont);

//piezas dentales
router.post(
  "/odontograma/:id_odontograma/pieza_dental/create",
  createPzaDental
);
router.put("/odontograma/pieza_dental/update/:id_pDental", updatePzaDental);
router.delete("/odontograma/pieza_dental/delete/:id_pDental", deletePzaDental);
//

//salud Bucal
router.get("/salud_bucal/consulta/:id_consulta", getAllSaludBucal);
router.post("/consulta/:id_consulta/salud_bucal/create", createSaludBucal);
router.put("/salud_bucal/update/:id_saludb", updateSaludBucal);

//piezas dentales salud bucal
router.post("/salud_bucal/:id_saludb/pieza_dental/create", createPzaSaludBucal);
router.put(
  "/salud_bucal/pieza_dental/update/:id_pDentalSb",
  updatePzaSaludBucal
);

//recursos fotograficos
router.get("/consulta/:id_consulta/recursos", getAllRecursosFoto);
router.post("/consulta/:id_consulta/recurso/create", createRecursoFoto);
router.put("/recurso/update/:id_recurso", updateRecursoFoto);
router.delete("/recurso/delete/:id_recurso", deleteRecursoFoto);

//fotos
router.post("/recurso/:id_recurso/fotografia/create", createFotografia);
router.delete("/fotografia/delete/:id_foto", deleteFotografia);

//
export default router;
