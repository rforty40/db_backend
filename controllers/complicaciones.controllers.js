//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultas_compli } from "../database/tratamientos_query.js";

//obtener complicaciones de tratamiento
export const getCompliTratam = async (req, res) => {
  try {
    //ejecutar consulta
    const [result] = await poolDB.query(consultas_compli.getCompliTratam, [
      req.params.id_tratam,
    ]);
    //verificar consulta exitosa
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("Complicaciones no encontradas"),
        "getCompliTratam",
        404
      );
    } else {
      //mostrar Complicaciones
      res.json(result);
      console.log("Complicaciones traidas desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getCompliTratam");
  }
};

//registrar Complicacion
export const createCompli = async (req, res) => {
  try {
    //realizar registro
    const [result] = await poolDB.query(consultas_compli.createCompli, [
      req.params.id_tratam,
      req.body.txt_compli,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Complicacion no registrada"),
        "createCompli",
        404
      );
    } else {
      console.log("Complicacion registrada en la BD");

      //consultar Complicacion recientemente registrado
      const [CompliReciente] = await poolDB.query(
        consultas_compli.getCompliID,
        [result.insertId]
      );

      //enviar datos al cliente
      res.json(CompliReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createCompli");
  }
};

//actualizar Complicacion
export const updateCompli = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_compli.updateCompli, [
      req.body.txt_compli,
      req.params.id_compli,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Complicacion no actualizada"),
        "updateCompli",
        404
      );
    } else {
      console.log("Complicacion actualizada en la BD");

      //Complicacion recientemente actualizada
      const [CompliReciente] = await poolDB.query(
        consultas_compli.getCompliID,
        [req.params.id_compli]
      );
      //enviar datos al cliente
      res.json(CompliReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateCompli");
  }
};

//eliminar Complicacion
export const deleteCompli = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_compli.deleteCompli, [
      req.params.id_compli,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Complicacion no eliminada"),
        "deleteCompli",
        404
      );
    } else {
      console.log("Complicacion eliminada");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteCompli");
  }
};
