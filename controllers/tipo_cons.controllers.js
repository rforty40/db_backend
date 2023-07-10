//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultasTipoConsulta } from "../database/listasAdmin_query.js";
import { consultasTipoPago } from "../database/listasAdmin_query.js";

//obtener Tipo de consulta
export const getTiposConsulta = async (req, res) => {
  try {
    let query_tipo_cons;
    switch (req.params.filtro) {
      case "todos":
        query_tipo_cons = consultasTipoConsulta.getAllTiposConsulta;
        break;
      case "busqueda":
        query_tipo_cons = consultasTipoConsulta.getTipoConsultaBusq;
        break;
      default:
        query_tipo_cons = consultasTipoConsulta.getTipoConsultaID;
        break;
    }
    //ejecutar query
    const [result] = await poolDB.query(query_tipo_cons, [
      req.params.id_tipoConsul, //cadena de busqueda
      req.params.id_tipoConsul,
    ]);

    //verificar consultar
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontraron los tipos de Consulta"),
        "getTiposConsulta",
        404
      );
    } else {
      res.json(result);
      console.log("Tipos de Consulta traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getTiposConsulta");
  }
};

//registrar Tipo de consulta
export const createTipoConsulta = async (req, res) => {
  try {
    const { tipo_tipoConsul, prec_tipPago } = req.body;

    const [result] = await poolDB.query(
      consultasTipoConsulta.createTipoConsulta,
      [tipo_tipoConsul]
    );
    //crear Pago del tipo de consulta
    const [result2] = await poolDB.query(consultasTipoPago.createTipoPago, [
      "Pago por Consulta - " + tipo_tipoConsul,
      prec_tipPago,
      null, //id proced
      result.insertId, //id tipo Consulta
    ]);

    if (result.affectedRows === 0 || result2.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("TipoConsulta no registrado"),
        "createTipoConsulta",
        404
      );
    } else {
      console.log("TipoConsulta registrado en la BD");

      const [TipoConsultaReciente] = await poolDB.query(
        consultasTipoConsulta.getTipoConsultaID,
        [result.insertId] //id tipo Consulta
      );
      res.json(TipoConsultaReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createTipoConsulta");
  }
};

//actualizar TipoConsulta
export const updateTipoConsulta = async (req, res) => {
  try {
    //actualizar Consulta
    const [result] = await poolDB.query(
      consultasTipoConsulta.updateTipoConsulta,
      [
        { tipo_tipoConsul: req.body.tipo_tipoConsul }, //SET
        req.params.id_tipoConsul, //ID
      ]
    );

    //obtener id de tipo de pago
    const [idtipoPago] = await poolDB.query(consultasTipoPago.getTipoPagoIDtc, [
      req.params.id_tipoConsul,
    ]);

    let result2;
    //actualizar tipo de pago
    if (idtipoPago.length > 0) {
      [result2] = await poolDB.query(consultasTipoPago.updateTipoPago, [
        {
          desc_tipPago: `Pago por Consulta - ${req.body.tipo_tipoConsul}`,
          prec_tipPago: req.body.prec_tipPago,
        }, //set
        idtipoPago[0].id_tipPago, //id
      ]);
    } else {
      //registro nuevo tipo de pago
      [result2] = await poolDB.query(consultasTipoPago.createTipoPago, [
        `Pago por Consulta - ${req.body.tipo_tipoConsul}`,
        req.body.prec_tipPago,
        null, //id proced
        req.params.id_tipoConsul, //id tipo Consulta
      ]);
    }

    //comprobar retorno de valores
    if (result.affectedRows === 0 || result2.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("TipoConsulta no actualizado"),
        "updateTipoConsulta",
        404
      );
    } else {
      console.log("TipoConsulta actualizado en la BD");
      //consultar la TipoConsulta recientemente actualizado
      const [TipoConsultaReciente] = await poolDB.query(
        consultasTipoConsulta.getTipoConsultaID,
        [req.params.id_tipoConsul]
      );
      //mostrar los datos actualizados
      res.json(TipoConsultaReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateTipoConsulta");
  }
};

//eliminar TipoConsulta
export const deleteTipoConsulta = async (req, res) => {
  try {
    //delete Consulta
    const [result] = await poolDB.query(
      consultasTipoConsulta.deleteTipoConsulta,
      [
        req.params.id_tipoConsul, //ID
      ]
    );

    //comprobar retorno de valores
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("TipoConsulta no eliminado"),
        "deleteTipoConsulta",
        404
      );
    } else {
      console.log("TipoConsulta eliminado en la BD");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteTipoConsulta");
  }
};
