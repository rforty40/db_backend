//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultas_diagnos } from "../database/diagnosticos_query.js";

//obtener Diagnos de diagnosticos
export const getDiagnosConsulta = async (req, res) => {
  try {
    //ejecutar consulta
    const [result] = await poolDB.query(consultas_diagnos.getDiagnosConsulta, [
      req.params.id_consulta,
    ]);
    //verificar consulta exitosa
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("Diagnosticos no encontrados"),
        "getDiagnosConsulta",
        404
      );
    } else {
      //mostrar Diagnosticos
      res.json(result);
      console.log("Diagnosticos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getDiagnosConsulta");
  }
};

//registrar Diagnosticos
export const createDiagnos = async (req, res) => {
  try {
    //extraer datos del body
    const { tipo_diag, codigoCIE, desc_diag } = req.body;

    //realizar registro
    const [result] = await poolDB.query(consultas_diagnos.createDiagnos, [
      req.params.id_consulta,
      tipo_diag,
      codigoCIE,
      desc_diag,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Diagnostico no registrado"),
        "createDiagnos",
        404
      );
    } else {
      console.log("Diagnostico registrado en la BD");

      //consultar Diagnostico recientemente registrado
      const [DiagnosReciente] = await poolDB.query(
        consultas_diagnos.getDiagnosID,
        [result.insertId]
      );

      //enviar datos al cliente
      res.json(DiagnosReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createDiagnos");
  }
};

//actualizar Diagnosticos
export const updateDiagnos = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_diagnos.updateDiagnos, [
      req.body,
      req.params.id_diag,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Diagnostico no actualizado"),
        "updateDiagnos",
        404
      );
    } else {
      console.log("Diagnostico actualizado en la BD");

      //Diagnostico recientemente registrado
      const [DiagnosReciente] = await poolDB.query(
        consultas_diagnos.getDiagnosID,
        [req.params.id_diag]
      );
      //enviar datos al cliente
      res.json(DiagnosReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateDiagnos");
  }
};

//eliminar Diagnostico
export const deleteDiagnos = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_diagnos.deleteDiagnos, [
      req.params.id_diag,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Diagnostico no eliminado"),
        "deleteDiagnos",
        404
      );
    } else {
      console.log("Diagnostico eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteDiagnos");
  }
};
