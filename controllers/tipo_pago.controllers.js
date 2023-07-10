//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultasTipoPago } from "../database/listasAdmin_query.js";

//mostrar los Tipos de Pago
export const getTiposPago = async (req, res) => {
  try {
    let query_tpago;
    switch (req.params.filtro) {
      case "todos":
        query_tpago = consultasTipoPago.getAllTipoPago;
        break;
      case "procedimiento":
        query_tpago = consultasTipoPago.getTipoPagoProced;
        break;
      case "consulta":
        query_tpago = consultasTipoPago.getTipoPagoConsul;
        break;
      case "usuario":
        query_tpago = consultasTipoPago.getTipoPagoUsuari;
        break;
      case "busqueda":
        query_tpago = consultasTipoPago.getTipoPagoBusq;
        break;
      default:
        query_tpago = consultasTipoPago.getTipoPagoID;
        break;
    }

    const [result] = await poolDB.query(query_tpago, [
      req.params.id_tipPago, //cadena de busqueda
      req.params.id_tipPago, //cadena de busqueda
    ]);

    //verificar consultar
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontraron tipos de pago"),
        "getTipoPago",
        404
      );
    } else {
      res.json(result);
      console.log("Tipos de pago traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getTiposPago");
  }
};

//registrar TipoPago
export const createTipoPago = async (req, res) => {
  try {
    const { desc_tipPago, prec_tipPago, id_proced, id_tipoConsul } = req.body;

    const [result] = await poolDB.query(consultasTipoPago.createTipoPago, [
      desc_tipPago,
      prec_tipPago,
      id_proced,
      id_tipoConsul,
    ]);

    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("TipoPago no registrado"),
        "createTipoPago",
        404
      );
    } else {
      console.log("TipoPago registrado en la BD");
      //consultar el TipoPago recientemente registrado

      const [TipoPagoReciente] = await poolDB.query(
        consultasTipoPago.getTipoPagoID,
        [result.insertId]
      );

      res.json(TipoPagoReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createTipoPago");
  }
};

//actualizar TipoPago
export const updateTipoPago = async (req, res) => {
  try {
    const [result] = await poolDB.query(consultasTipoPago.updateTipoPago, [
      req.body,
      req.params.id_tipPago,
    ]);
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("TipoPago no actualizado"),
        "updateTipoPago",
        404
      );
    } else {
      console.log("TipoPago actualizado en la BD");
      //consultar la TipoPago recientemente actualizado
      const [TipoPagoReciente] = await poolDB.query(
        consultasTipoPago.getTipoPagoID,
        [req.params.id_tipPago]
      );
      res.json(TipoPagoReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateTipoPago");
  }
};

//eliminar TipoPago
export const deleteTipoPago = async (req, res) => {
  try {
    const [result] = await poolDB.query(consultasTipoPago.deleteTipoPago, [
      req.params.id_tipPago,
    ]);

    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("TipoPago no eliminada"),
        "deleteTipoPago",
        404
      );
    } else {
      console.log("TipoPago eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteTipoPago");
  }
};
