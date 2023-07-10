//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultas_presc } from "../database/tratamientos_query.js";

//obtener prescripciones de tratamiento
export const getPrescTratam = async (req, res) => {
  try {
    //ejecutar consulta
    const [result] = await poolDB.query(consultas_presc.getPrescTratam, [
      req.params.id_tratam,
    ]);
    //verificar consulta exitosa
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("prescripciones no encontradas"),
        "getPrescTratam",
        404
      );
    } else {
      //mostrar Tratamientos
      res.json(result);
      console.log("prescripciones traidas desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getPrescTratam");
  }
};

//registrar Prescripcion
export const createPresc = async (req, res) => {
  try {
    //extraer datos del body
    const { desc_presc, dosi_presc } = req.body;
    //realizar registro
    const [result] = await poolDB.query(consultas_presc.createPresc, [
      req.params.id_tratam,
      desc_presc,
      dosi_presc,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Prescripcion no registrada"),
        "createPresc",
        404
      );
    } else {
      console.log("Prescripcion registrada en la BD");

      //consultar Prescripcion recientemente registrado
      const [PrescReciente] = await poolDB.query(consultas_presc.getPrescID, [
        result.insertId,
      ]);
      //enviar datos al cliente
      res.json(PrescReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createPresc");
  }
};

//actualizar Prescripcion
export const updatePresc = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_presc.updatePresc, [
      req.body,
      req.params.id_presc,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Prescripcion no actualizada"),
        "updatePresc",
        404
      );
    } else {
      console.log("Prescripcion actualizada en la BD");

      //Prescripcion recientemente actualizada
      const [PrescReciente] = await poolDB.query(consultas_presc.getPrescID, [
        req.params.id_presc,
      ]);
      //enviar datos al cliente
      res.json(PrescReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updatePresc");
  }
};

//eliminar Prescripcion
export const deletePresc = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_presc.deletePresc, [
      req.params.id_presc,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Prescripcion no eliminada"),
        "deletePresc",
        404
      );
    } else {
      console.log("Prescripcion eliminada");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deletePresc");
  }
};
