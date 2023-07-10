//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultasProcedimientos } from "../database/listasAdmin_query.js";
import { consultasTipoPago } from "../database/listasAdmin_query.js";

//obtener Tipo de Proced
export const getBusqProced = async (req, res) => {
  try {
    //ejecutar query
    let result;

    if (req.params.cadenaBusq === "_") {
      [result] = await poolDB.query(consultasProcedimientos.getTodosLosProced);
    } else {
      [result] = await poolDB.query(consultasProcedimientos.getBusquedaProced, [
        req.params.cadenaBusq,
        req.params.cadenaBusq,
        req.params.cadenaBusq,
        req.params.cadenaBusq,
      ]);
    }

    //verificar Procedimientos
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontraron los procedimientos"),
        "getBusqProced",
        404
      );
    } else {
      //devolver procedimientos
      res.json(result);
      console.log("Procedimientos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getBusqProced");
  }
};

//
export const getCuadroDeBusqProc = async (req, res) => {
  try {
    let queryBusqProc;
    switch (req.params.seccion) {
      case "titulos":
        if (req.params.id === "_") {
          queryBusqProc = consultasProcedimientos.getTitulos;
        } else {
          queryBusqProc = consultasProcedimientos.getProcesTitulos;
        }
        break;

      case "subtitulos":
        queryBusqProc = consultasProcedimientos.getSubtitulos;
        break;

      case "proced":
        queryBusqProc = consultasProcedimientos.getNomProced;
        break;

      default:
        queryBusqProc = consultasProcedimientos.getTsnomProced;
        break;
    }

    //ejecutar query
    const [result] = await poolDB.query(queryBusqProc, [req.params.id]);

    //verificar Titulos
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontraron los datos"),
        "getNomenclaturasProc",
        404
      );
    } else {
      //devolver procedimientos
      res.json(result);
      console.log("Datos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getNomenclaturasProc");
  }
};

//
export const getProcedimientos = async (req, res) => {
  try {
    let queryProced;
    switch (req.params.filtro) {
      case "todos":
        queryProced = consultasProcedimientos.getAllProced;
        break;
      case "busqueda":
        queryProced = consultasProcedimientos.getProcedBusq;
        break;
      default:
        queryProced = consultasProcedimientos.getProcedID;
        break;
    }

    //ejecutar query
    const [result] = await poolDB.query(queryProced, [
      req.params.id_proced,
      req.params.id_proced,
      req.params.id_proced,
      req.params.id_proced,
    ]);

    //verificar Procedimientos
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontraron los procedimientos"),
        "getProcedimiento",
        404
      );
    } else {
      //devolver procedimientos
      res.json(result);
      console.log("Procedimientos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getProcedimiento");
  }
};

//registrar Procedimiento
export const createProcedimiento = async (req, res) => {
  try {
    //destructurar el body
    const { cod_proced, nom_proced, desc_proced, prec_proced } = req.body;

    //registrar procedimiento
    const [result] = await poolDB.query(consultasProcedimientos.createProced, [
      cod_proced,
      nom_proced,
      desc_proced,
    ]);
    //crear tipo de pago
    const [result2] = await poolDB.query(consultasTipoPago.createTipoPago, [
      "Pago por Procedimiento - " + nom_proced,
      prec_proced, //precio
      result.insertId, //id proced
      null, //id tipo Proced
    ]);

    if (result.affectedRows === 0 || result2.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Procedimiento no registrado"),
        "createProcedimiento",
        404
      );
    } else {
      console.log("Procedimiento registrado en la BD");

      const [procedReciente] = await poolDB.query(
        consultasProcedimientos.getProcedID,
        [result.insertId] //id tipo Proced
      );
      res.json(procedReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createProcedimiento");
  }
};

//actualizar procedimiento
export const updateProcedimiento = async (req, res) => {
  try {
    //actualizar procedimiento
    const [result] = await poolDB.query(consultasProcedimientos.updateProced, [
      {
        cod_proced: req.body.cod_proced,
        nom_proced: req.body.nom_proced,
        desc_proced: req.body.desc_proced,
      }, //SET
      req.params.id_proced, //ID
    ]);

    //obtener id de tipo de pago
    const [idtipoPago] = await poolDB.query(consultasTipoPago.getTipoPagoIDpr, [
      req.params.id_proced,
    ]);

    //actualizar tipo de pago
    let result2;
    if (idtipoPago.length > 0) {
      [result2] = await poolDB.query(consultasTipoPago.updateTipoPago, [
        {
          desc_tipPago: `Pago por procedimiento - ${req.body.nom_proced}`,
          prec_tipPago: req.body.prec_proced,
        }, //set
        idtipoPago[0].id_tipPago, //id
      ]);
    } else {
      //registro de nuevo tipo de pago
      [result2] = await poolDB.query(consultasTipoPago.createTipoPago, [
        `Pago por Procedimiento - ${req.body.nom_proced}`,
        req.body.prec_proced, //precio
        req.params.id_proced, //id proced
        null, //id tipo Proced
      ]);
    }

    //comprobar retorno de valores
    if (result.affectedRows === 0 || result2.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Procedimiento no actualizado"),
        "updateProcedimiento",
        404
      );
    } else {
      console.log("Procedimiento actualizado en la BD");
      //Procedemiento recientemente actualizado
      const [procedReciente] = await poolDB.query(
        consultasProcedimientos.getProcedID,
        [req.params.id_proced]
      );
      res.json(procedReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateProcedimiento");
  }
};

//eliminar TipoProced
export const deleteProcedimiento = async (req, res) => {
  try {
    //delete Proced
    const [result] = await poolDB.query(consultasProcedimientos.deleteProced, [
      req.params.id_proced, //ID
      ,
    ]);

    //comprobar retorno de valores
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Procedimiento no eliminado"),
        "deleteProcedimiento",
        404
      );
    } else {
      console.log("Procedimiento eliminado en la BD");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteProcedimiento");
  }
};
