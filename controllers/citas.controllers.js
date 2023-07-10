//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultasCitas } from "../database/citas_querys.js";

//obtener todas las citas pendientes
export const getCitas = async (req, res) => {
  try {
    //procedimiento almacenado
    await poolDB.query(consultasCitas.proc_actualizar_citas);

    //seleccionar filtro del where
    let queryCitas;
    switch (req.params.filtro) {
      case "all":
        queryCitas = consultasCitas.getAllCitas;
        break;
      case "pendientes":
        queryCitas = consultasCitas.getCitasPendientes;
        break;
      case "hoy":
        queryCitas = consultasCitas.getCitasHoy;
        break;
      case "manana":
        queryCitas = consultasCitas.getCitasManana;
        break;
      case "semana":
        queryCitas = consultasCitas.getCitasSemana;
        break;
      case "mes":
        queryCitas = consultasCitas.getCitaMes;
        break;

      default: //entre fechas
        queryCitas = consultasCitas.getCitasEntreFechas;
        break;
    }
    //ejecutar query
    const [result] = await poolDB.query(queryCitas, [
      req.params.fechaInicial,
      req.params.fechaFinal,
    ]);

    //verificar consultar
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontraron citas pendientes"),
        "getCitas",
        404
      );
    } else {
      //enviar los datos al cliente
      res.json(result);
      console.log("Citas pendientes traidas desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getCitas");
  }
};

//obtener una sola cita
export const getCita = async (req, res) => {
  try {
    //ejecutar consulta
    const [result] = await poolDB.query(consultasCitas.getCita, [
      req.params.fecha_citaAgen,
      req.params.horaIni_citaAgen,
    ]);
    //verificar cita consultada
    if (result.length === 0) {
      handleHttpError(res, new Error("Cita no encontrada"), "getCita", 404);
    } else {
      //mostrar cita
      res.json(result[0]);
      console.log("Cita traida de la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getCita");
  }
};

//registrar Cita
export const createCita = async (req, res) => {
  try {
    //extraer datos del body
    const {
      fecha_citaAgen,
      horaIni_citaAgen,
      horaFin_citaAgen,
      id_paciente,
      moti_citaAgen,
      esta_citaAgen,
    } = req.body;

    //realizar registro
    const [result] = await poolDB.query(consultasCitas.createCita, [
      fecha_citaAgen,
      horaIni_citaAgen,
      horaFin_citaAgen,
      id_paciente,
      moti_citaAgen,
      esta_citaAgen,
    ]);
    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(res, new Error("Cita no registrada"), "createCita", 404);
    } else {
      console.log("Cita registrada ");

      //consultar la cita recientemente registrada
      const [citaReciente] = await poolDB.query(consultasCitas.getCita, [
        fecha_citaAgen,
        horaIni_citaAgen,
      ]);
      //enviar datos al cliente
      res.json(citaReciente[0]);
      //procedimiento almacenado
      const proced = await poolDB.query(consultasCitas.proc_actualizar_citas);
    }
  } catch (error) {
    handleHttpError(res, error, "createCita");
  }
};

//actualizar cita
export const updateCita = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultasCitas.updateCita, [
      req.body,
      req.params.fecha_citaAgen,
      req.params.horaIni_citaAgen,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(res, new Error("Cita no actualizada"), "updateCita", 404);
    } else {
      console.log("Cita atualizada ");

      //consultar la cita recientemente actualizada
      const { fecha_citaAgen, horaIni_citaAgen } = req.body;
      const [citaReciente] = await poolDB.query(consultasCitas.getCita, [
        fecha_citaAgen,
        horaIni_citaAgen,
      ]);
      //mostrar Cita al cliente
      res.json(citaReciente[0]);
      //procedimiento almacenado
      const proced = await poolDB.query(consultasCitas.proc_actualizar_citas);
    }
  } catch (error) {
    handleHttpError(res, error, "updateCita");
  }
};

//eliminar cita
export const deleteCita = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultasCitas.deleteCita, [
      req.params.fecha_citaAgen,
      req.params.horaIni_citaAgen,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(res, new Error("Cita no eliminada"), "deleteCita", 404);
    } else {
      console.log("Cita eliminada");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteCita");
  }
};

//mostrar citas pendientes del paciente
export const getCitasPendPac = async (req, res) => {
  try {
    let queryCitasPend;
    //ejecutar query sin rango de fechas
    if (req.params.fechaInicial === "_" || req.params.fechaFinal === "_") {
      queryCitasPend = consultasCitas.getCitasPendPac;
      //con rangos de fecha
    } else {
      queryCitasPend = consultasCitas.getCitasPendPacFech;
    }
    const [result] = await poolDB.query(queryCitasPend, [
      req.params.id_paciente,
      req.params.esta_citaAgen,
      req.params.fechaInicial,
      req.params.fechaFinal,
    ]);
    //verificar consulta
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontraron citas en este estado y rango de fecha"),
        "getCitasPendPac",
        404
      );
    } else {
      res.json(result);
      console.log("Citas pendientes del paciente traidas desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getCitasPendPac");
  }
};
