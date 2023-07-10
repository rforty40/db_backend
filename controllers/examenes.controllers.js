//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultas_examenes } from "../database/examenes_query.js";

//obtener todas las enfermedades
export const getEnfermedadesCIE = async (req, res) => {
  try {
    let result;

    //mostrar todas las enfermedades
    if (req.params.busqueda === "_") {
      [result] = await poolDB.query(consultas_examenes.getAllEnferCIE);
    } else {
      [result] = await poolDB.query(consultas_examenes.getEnferCIEBusq, [
        req.params.busqueda,
        req.params.busqueda,
        req.params.busqueda,
        req.params.busqueda,
      ]);
    }

    //verificar consultar
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontro la lista de enfermedades"),
        "getEnfermedadesCIE",
        404
      );
    } else {
      //enviar los datos al cliente
      res.json(result);
      console.log("Lista de enfermedades traidas desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getEnfermedadesCIE");
  }
};

//obtener los examenes de la consulta
export const getExamenesConsulta = async (req, res) => {
  try {
    //ejecutar consulta
    const [result] = await poolDB.query(
      consultas_examenes.getExamenesConsulta,
      [req.params.id_consulta]
    );
    //verificar consulta exitosa
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("Examenes estomatognáticos no encontrados"),
        "getExamenesConsulta",
        404
      );
    } else {
      //mostrar Consulta
      res.json(result);
      console.log("Examenes estomatognáticos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getExamenesConsulta");
  }
};

//registrar examen
export const createExamen = async (req, res) => {
  try {
    //extraer datos del body
    const { regionAfec_examEst, codigoCIE, desc_examEst } = req.body;

    //realizar registro
    const [result] = await poolDB.query(consultas_examenes.createExamen, [
      req.params.id_consulta,
      regionAfec_examEst,
      codigoCIE,
      desc_examEst,
    ]);
    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Examen no registrado"),
        "createExamen",
        404
      );
    } else {
      console.log("Examen registrado en la BD");

      //consultar examen recientemente registrado
      const [examenReciente] = await poolDB.query(
        consultas_examenes.getExamenID,
        [result.insertId]
      );
      //enviar datos al cliente
      res.json(examenReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createExamen");
  }
};

//actualizar examen
export const updateExamen = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_examenes.updateExamen, [
      req.body,
      req.params.id_examen,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("examen no actualizado"),
        "updateExamen",
        404
      );
    } else {
      console.log("Consulta actualizada en la BD");

      //consultar examen recientemente registrado
      const [examenReciente] = await poolDB.query(
        consultas_examenes.getExamenID,
        [req.params.id_examen]
      );
      //enviar datos al cliente
      res.json(examenReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateExamen");
  }
};

//eliminar Examen
export const deleteExamen = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_examenes.deleteExamen, [
      req.params.id_examen,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Examen no eliminado"),
        "deleteExamen",
        404
      );
    } else {
      console.log("Examen eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteExamen");
  }
};
