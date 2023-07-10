//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import {
  consultasConsultas,
  validarFechaAnio,
  validarFechaEnRango,
  validarFechaMesAnio,
} from "../database/consultas_query.js";

//Historial clinico
export const getConsultas = async (req, res) => {
  try {
    let resultC;
    //todo el historial
    if (req.params.filtro === "no_filtros") {
      [resultC] = await poolDB.query(consultasConsultas.getConsultasNoFiters, [
        req.params.id_paciente,
      ]);
    } else {
      [resultC] = await poolDB.query(consultasConsultas.getConsultas, [
        req.params.id_paciente,
      ]);
    }

    //verificar query
    if (resultC.length === 0) {
      handleHttpError(
        res,
        new Error("Historial clínico vacío"),
        "getConsultas",
        404
      );
    } else {
      //modificar JSON
      let resultD,
        resultT,
        resultP,
        resultPlanD,
        resultPlanT,
        resultPlanE,
        resultFotos;
      for (let consulta of resultC) {
        //agregar planes de diagnostico
        [resultPlanD] = await poolDB.query(consultasConsultas.getPlanesDiag, [
          consulta.id_consulta,
        ]);
        consulta.planesD = resultPlanD;

        //agregar planes terapeuticos
        [resultPlanT] = await poolDB.query(consultasConsultas.getPlanesTera, [
          consulta.id_consulta,
        ]);
        consulta.planesT = resultPlanT;

        //agregar planes educacionales
        [resultPlanE] = await poolDB.query(consultasConsultas.getPlanesEdu, [
          consulta.id_consulta,
        ]);
        consulta.planesE = resultPlanE;

        //agregar Diagnosticos
        [resultD] = await poolDB.query(consultasConsultas.getDiagnosticos, [
          consulta.id_consulta,
        ]);
        consulta.diagnosticos = resultD;

        //agregar Tratamientos
        [resultT] = await poolDB.query(consultasConsultas.getTratamientos, [
          consulta.id_consulta,
        ]);
        consulta.tratamientos = resultT;

        //agregar Procedimientos
        for (let tratam of consulta.tratamientos) {
          [resultP] = await poolDB.query(consultasConsultas.getProcedimientos, [
            tratam.id_tratam,
          ]);
          tratam.procedimientos = resultP;
        }

        //agregar Fotos
        [resultFotos] = await poolDB.query(
          consultasConsultas.getFotosConsulta,
          [consulta.id_consulta]
        );
        consulta.fotos = resultFotos;
      }
      //variables
      let resultadosFiltrados;
      const prm1 = req.params.prm1;
      const prm2 = req.params.prm2;

      switch (req.params.filtro) {
        case "anio":
          resultadosFiltrados = resultC.reduce((acc, consActual) => {
            if (validarFechaAnio(prm1, consActual.fecha_consulta)) {
              acc.push(consActual);
            }
            return acc;
          }, []);
          break;

        case "mes":
          resultadosFiltrados = resultC.reduce((acc, consActual) => {
            if (validarFechaMesAnio(prm1, consActual.fecha_consulta)) {
              acc.push(consActual);
            }
            return acc;
          }, []);
          break;

        case "range":
          resultadosFiltrados = resultC.reduce((acc, consActual) => {
            if (validarFechaEnRango(prm1, prm2, consActual.fecha_consulta)) {
              acc.push(consActual);
            }
            return acc;
          }, []);
          break;

        default:
          resultadosFiltrados = resultC;
          break;
      }

      //mostrar historial
      if (resultadosFiltrados.length === 0) {
        handleHttpError(
          res,
          new Error("No se encontraron consultas en el rango de fecha"),
          "getConsultas",
          404
        );
      } else {
        res.json(resultadosFiltrados);
      }

      console.log("Historial clínico traido de la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getConsultas");
  }
};

//Detalle Consulta
export const getDetalleConsulta = async (req, res) => {
  try {
    let queryDetalle;
    switch (req.params.seccion) {
      case "header":
        queryDetalle = consultasConsultas.getHeaderConsulta;
        break;

      case "detalle":
        queryDetalle = consultasConsultas.getConsultaID;
        break;

      default: //signos vitales
        queryDetalle = consultasConsultas.getSignoVital;
        break;
    }

    //ejecutar consulta
    const [result] = await poolDB.query(queryDetalle, [req.params.id_consulta]);

    //verificar Consulta consultada
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error(req.params.seccion + " de consulta no encontrada"),
        "getDetalleConsulta",
        404
      );
    } else {
      //mostrar Consulta
      res.json(result[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "getDetalleConsulta");
  }
};

//registrar Consulta
export const createConsulta = async (req, res) => {
  try {
    //extraer datos del body
    const {
      //id_paciente,
      mot_consulta,
      probleAct_consulta,
      fecha_consulta,
      hora_consulta,
      id_tipoConsul,
    } = req.body;

    //realizar registro
    const [result] = await poolDB.query(consultasConsultas.createConsulta, [
      req.params.id_paciente,
      mot_consulta,
      probleAct_consulta,
      fecha_consulta,
      hora_consulta,
      id_tipoConsul,
    ]);
    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Consulta no registrada"),
        "createConsulta",
        404
      );
    } else {
      console.log("Consulta registrada en la BD");

      //consultar la Consulta recientemente registrada
      const [ConsultaReciente] = await poolDB.query(
        consultasConsultas.getConsultaID,
        [result.insertId]
      );
      //enviar datos al cliente
      res.json(ConsultaReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createConsulta");
  }
};

//actualizar Consulta
export const updateConsulta = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultasConsultas.updateConsulta, [
      req.body,
      req.params.id_consulta,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Consulta no actualizada"),
        "updateConsulta",
        404
      );
    } else {
      console.log("Consulta actualizada en la BD");

      //consultar la Consulta recientemente actualizada
      const [ConsultaReciente] = await poolDB.query(
        consultasConsultas.getConsultaID,
        [req.params.id_consulta]
      );
      //mostrar Consulta al cliente
      res.json(ConsultaReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateConsulta");
  }
};

//eliminar Consulta
export const deleteConsulta = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultasConsultas.deleteConsulta, [
      req.params.id_consulta,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Consulta no eliminada"),
        "deleteConsulta",
        404
      );
    } else {
      console.log("Consulta eliminada");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteConsulta");
  }
};

//crear Signo Vitales
export const createSignoVital = async (req, res) => {
  try {
    //extraer datos del body
    const {
      temp_signoVital,
      presArt_signoVital,
      freCar_signoVital,
      freRes_signoVital,
    } = req.body;

    //realizar registro
    const [result] = await poolDB.query(consultasConsultas.createSignoVital, [
      temp_signoVital,
      presArt_signoVital,
      freCar_signoVital,
      freRes_signoVital,
      req.params.id_consulta,
    ]);
    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Signos vitales no registrados"),
        "createSignoVital",
        404
      );
    } else {
      console.log("Signos vitales registrados en la BD");

      //consultar los signos vitales recientemente registrada
      const [sv_reciente] = await poolDB.query(
        consultasConsultas.getSignoVital,
        [req.params.id_consulta]
      );
      //enviar datos al cliente
      res.json(sv_reciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createSignoVital");
  }
};

//actualizar signo vitales
export const updateSignoVital = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultasConsultas.updateSignoVital, [
      req.body,
      req.params.id_signo,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Signos vitales no actualizados"),
        "updateSignoVital",
        404
      );
    } else {
      console.log("Signos vitales actualizados en la BD");

      //consultar los signos vitales recientemente actualizados
      const [sv_reciente] = await poolDB.query(
        consultasConsultas.getSignoVital,
        [req.params.id_consulta]
      );
      //enviar datos al cliente
      res.json(sv_reciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateSignoVital");
  }
};
