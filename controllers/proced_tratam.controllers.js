//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultas_proced } from "../database/tratamientos_query.js";

//obtener Procedimientos de tratamiento
export const getProcedTratam = async (req, res) => {
  try {
    //ejecutar consulta
    const [result] = await poolDB.query(consultas_proced.getProcedTratam, [
      req.params.id_tratam,
    ]);
    //verificar consulta exitosa
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("Procedimientos no encontrados"),
        "getProcedTratam",
        404
      );
    } else {
      //mostrar Tratamientos
      res.json(result);
      console.log("Procedimientos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getProcedTratam");
  }
};

//registrar Procedimiento
export const createProced = async (req, res) => {
  try {
    //realizar registro
    const [result] = await poolDB.query(consultas_proced.createProcedTra, [
      req.params.id_tratam,
      req.body.id_proced,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Procedimiento no registrado"),
        "createProced",
        404
      );
    } else {
      console.log("Procedimiento registrado en la BD");

      //consultar Procedimiento recientemente registrado
      const [ProcedReciente] = await poolDB.query(
        consultas_proced.getProcedTraID,
        [result.insertId]
      );

      //enviar datos al cliente
      res.json(ProcedReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createProced");
  }
};
//eliminar Procedimiento
export const deleteProced = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_proced.deleteProcedTra, [
      req.params.id_proced,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Procedimiento no eliminado"),
        "deleteProced",
        404
      );
    } else {
      console.log("Procedcacion eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteProced");
  }
};
