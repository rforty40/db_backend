//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultas_planes } from "../database/planes_query.js";

//obtener planes de diagnosticos
export const getPlanesConsulta = async (req, res) => {
  try {
    //ejecutar consulta
    const [resultDiag] = await poolDB.query(
      consultas_planes.getPlanesConsulta,
      [req.params.id_consulta, "Diagnóstico"]
    );
    const [resultTera] = await poolDB.query(
      consultas_planes.getPlanesConsulta,
      [req.params.id_consulta, "Terapéutico"]
    );
    const [resultEduc] = await poolDB.query(
      consultas_planes.getPlanesConsulta,
      [req.params.id_consulta, "Educacional"]
    );

    //verificar consulta exitosa
    if (
      resultDiag.length === 0 &&
      resultTera.length === 0 &&
      resultEduc.length === 0
    ) {
      handleHttpError(
        res,
        new Error(
          "Planes Diagnositco, Terapeuticos, Educacional no encontrados"
        ),
        "getPlanesConsulta",
        404
      );
    } else {
      //mostrar Planes
      res.json([resultDiag, resultTera, resultEduc]);
      console.log(
        "Planes Diagnositco, Terapeuticos, Educacional traidos desde la BD"
      );
    }
  } catch (error) {
    handleHttpError(res, error, "getPlanesConsulta");
  }
};

//registrar Plan
export const createPlan = async (req, res) => {
  try {
    //extraer datos del body
    const { tipo_planDiag, exam_planDiag, id_tipoTratam, desc_planDiag } =
      req.body;

    //realizar registro
    const [result] = await poolDB.query(consultas_planes.createPlan, [
      req.params.id_consulta,
      tipo_planDiag,
      exam_planDiag,
      id_tipoTratam,
      desc_planDiag,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(res, new Error("Plan no registrado"), "createPlan", 404);
    } else {
      console.log("Plan registrado en la BD");

      //consultar plan recientemente registrado
      const [PlanReciente] = await poolDB.query(consultas_planes.getPlanID, [
        result.insertId,
      ]);

      //enviar datos al cliente
      res.json(PlanReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createPlan");
  }
};

//actualizar Plan
export const updatePlan = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_planes.updatePlan, [
      req.body,
      req.params.id_plan,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(res, new Error("Plan no actualizado"), "updatePlan", 404);
    } else {
      console.log("Plan actualizado en la BD");

      //Planr Plan recientemente registrado
      const [PlanReciente] = await poolDB.query(consultas_planes.getPlanID, [
        req.params.id_plan,
      ]);
      //enviar datos al cliente
      res.json(PlanReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updatePlan");
  }
};

//eliminar Plan
export const deletePlan = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_planes.deletePlan, [
      req.params.id_plan,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(res, new Error("Plan no eliminado"), "deletePlan", 404);
    } else {
      console.log("Plan eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deletePlan");
  }
};
