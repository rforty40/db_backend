import { Router } from "express";

import {
  getTiposPago,
  createTipoPago,
  updateTipoPago,
  deleteTipoPago,
} from "../controllers/tipo_pago.controllers.js";

import {
  getTiposConsulta,
  createTipoConsulta,
  updateTipoConsulta,
  deleteTipoConsulta,
} from "../controllers/tipo_cons.controllers.js";

//procedimientos odontologicos
import {
  getBusqProced,
  getCuadroDeBusqProc,
  getProcedimientos,
  createProcedimiento,
  deleteProcedimiento,
  updateProcedimiento,
} from "../controllers/procedimientos.controllers.js";

//tipos tratamientos
import {
  getTiposTratam,
  createTipoTratam,
  updateTipoTratam,
  deleteTipoTratam,
} from "../controllers/tipo_tratam.controllers.js";

//lista de ingresos
import {
  getIngresos,
  createIngreso,
  updateIngreso,
  deleteIngreso,
} from "../controllers/ingresos.controllers.js";

//Lista de gastos
import {
  getGastos,
  createGasto,
  updateGasto,
  deleteGasto,
} from "../controllers/gastos.controllers.js";

//Panel de administracion
import {
  getGanancias,
  getPanelAdmin,
} from "../controllers/panel_admin.controllers.js";

//router
const router = Router();

//tipos de pagos
router.get("/administracion/tiposPago/:filtro/:id_tipPago", getTiposPago);
router.post("/administracion/tiposPago/create", createTipoPago);
router.put("/administracion/tiposPago/update/:id_tipPago", updateTipoPago);
router.delete("/administracion/tiposPago/delete/:id_tipPago", deleteTipoPago);

//tipos de consultas
router.get(
  "/administracion/tiposConsulta/:filtro/:id_tipoConsul",
  getTiposConsulta
);
router.post("/administracion/tiposConsulta/create", createTipoConsulta);
router.put(
  "/administracion/tiposConsulta/update/:id_tipoConsul",
  updateTipoConsulta
);
router.delete(
  "/administracion/tiposConsulta/delete/:id_tipoConsul",
  deleteTipoConsulta
);

//tipos de tratamiento
router.get(
  "/administracion/tiposTratamiento/:filtro/:id_tipoTratam",
  getTiposTratam
);
router.post("/administracion/tiposTratamiento/create", createTipoTratam);
router.put(
  "/administracion/tiposTratamiento/update/:id_tipoTratam",
  updateTipoTratam
);
router.delete(
  "/administracion/tiposTratamiento/delete/:id_tipoTratam",
  deleteTipoTratam
);

//procedimientos
router.get(
  "/administracion/procedimientos/busqueda/:cadenaBusq",
  getBusqProced
);
router.get(
  "/administracion/procedimientos/busqueda/:seccion/:id",
  getCuadroDeBusqProc
);
router.get(
  "/administracion/procedimientos/get/:filtro/:id_proced",
  getProcedimientos
);
router.post("/administracion/procedimientos/create", createProcedimiento);
router.put(
  "/administracion/procedimientos/update/:id_proced",
  updateProcedimiento
);
router.delete(
  "/administracion/procedimientos/delete/:id_proced",
  deleteProcedimiento
);

//lista de ingresos
router.get(
  "/administracion/lista_ingresos/:fil_tipo/:fil_fecha/:prm1/:prm2/:prm_busq",
  getIngresos
);
router.post("/administracion/lista_ingresos/create", createIngreso);
router.put("/administracion/lista_ingresos/update/:id_ingreso", updateIngreso);
router.delete(
  "/administracion/lista_ingresos/delete/:id_ingreso",
  deleteIngreso
);

//lista de gastos

router.get("/administracion/lista_gastos/:fil_fecha/:prm1/:prm2", getGastos);
router.post("/administracion/lista_gastos/create", createGasto);
router.put("/administracion/lista_gastos/update/:id_gasto", updateGasto);
router.delete("/administracion/lista_gastos/delete/:id_gasto", deleteGasto);

//panel administracion
router.get("/administracion/panel/:tabla/:filtro/:fech1/:fech2", getPanelAdmin);
router.get(
  "/administracion/ganancias/:tabla/:filtro/:fech1/:fech2",
  getGanancias
);
//
export default router;
