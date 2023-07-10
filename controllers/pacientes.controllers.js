//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultasPacientes } from "../database/pacientes_query.js";

//mostrarPacientes
export const getAllPacientes = async (req, res) => {
  try {
    const [result] = await poolDB.query(consultasPacientes.getAllPacientes);
    //verificar si se trajeron los datos
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontraron los pacientes"),
        "getAllPacientes",
        404
      );
    } else {
      res.json(result); //devolver los datos
      console.log("Pacientes traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getAllPacientes");
  }
};

//buscar paciente por id
export const getPacienteID = async (req, res) => {
  try {
    //ejecutar query
    const [result] = await poolDB.query(consultasPacientes.getPacienteId, [
      req.params.id_paciente,
    ]);
    //verificar si se trajeron los datos
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("Paciente no encontrado"),
        "getPacienteID",
        404
      );
    } else {
      //devolver datos
      res.json(result[0]);
      console.log("Paciente traida de la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getPacienteID");
  }
};

//buscar pacientes y solo mostrar id, nombre, cedula
export const getNombreCedula = async (req, res) => {
  try {
    //ejecutar query
    const [result] = await poolDB.query(consultasPacientes.getPacientesNC, [
      req.params.nombreCedula,
      req.params.nombreCedula,
      req.params.nombreCedula,
      req.params.nombreCedula,
    ]);
    //verificar si se trajeron los datos
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error(
          "No se encontraron coincidencias en la busqueda de pacientes"
        ),
        "getNombreCedula",
        404
      );
    } else {
      //devolver datos
      res.json(result);
      console.log("Se encontraron coincidencias en la busqueda de pacientes");
    }
  } catch (error) {
    handleHttpError(res, error, "getNombreCedula");
  }
};

//registrar paciente
export const createPaciente = async (req, res) => {
  try {
    //extraer datos del body
    const {
      ced_paciente,
      priNom_paciente,
      segNom_paciente,
      priApe_paciente,
      segApe_paciente,
      eda_paciente,
      sex_paciente,
      ema_paciente,
      tel_paciente,
      nomRes_paciente,
      parRes_paciente,
      telRes_paciente,
    } = req.body;

    //ejecutar el body
    const [result] = await poolDB.query(consultasPacientes.createPaciente, [
      ced_paciente,
      priNom_paciente,
      segNom_paciente,
      priApe_paciente,
      segApe_paciente,
      eda_paciente,
      sex_paciente,
      ema_paciente,
      tel_paciente,
      nomRes_paciente,
      parRes_paciente,
      telRes_paciente,
    ]);

    //comprobar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Paciente no registrado"),
        "createPaciente",
        404
      );
    } else {
      console.log("Paciente registrado en la BD");

      //consultar y devolver el paciente recientemente registrado
      const [pacienteReciente] = await poolDB.query(
        consultasPacientes.getPacienteId,
        [result.insertId]
      );
      res.json(pacienteReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createPaciente");
  }
};

//actualizar paciente
export const updatePaciente = async (req, res) => {
  try {
    //ejecutar actualizacion
    const [result] = await poolDB.query(consultasPacientes.updatePaciente, [
      req.body,
      req.params.id_paciente,
    ]);
    //verificar actualizacion
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Paciente no actualizado"),
        "updatePaciente",
        404
      );
    } else {
      console.log("Paciente actualizado en la BD");
      //consultar y devolver el paciente recientemente actualizado
      const [PacienteReciente] = await poolDB.query(
        consultasPacientes.getPacienteId,
        [req.params.id_paciente]
      );
      res.json(PacienteReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updatePaciente");
  }
};

//eliminar paciente
export const deletePaciente = async (req, res) => {
  try {
    //ejecutar eliminación
    const [result] = await poolDB.query(consultasPacientes.deletePaciente, [
      req.params.id_paciente,
    ]);
    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Paciente no eliminado"),
        "deletePaciente",
        404
      );
    } else {
      console.log("Paciente eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deletePaciente");
  }
};
