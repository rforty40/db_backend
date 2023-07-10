//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import {
  consultas_gastos,
  arrGastosFecha,
  arrGastosPor,
  queryGastos,
} from "../database/gastos_query.js";

//Mostrar lista de Gastos
export const getGastos = async (req, res) => {
  try {
    // const prm_busq = req.params.prm_busq;
    const prm1 = req.params.prm1;
    const prm2 = req.params.prm2;
    let queryFinal = queryGastos;
    let arrPrmtros = [];

    //filtro por fecha
    switch (req.params.fil_fecha) {
      case "todos":
        queryFinal += arrGastosFecha[0];

        break;

      case "anio":
        queryFinal += arrGastosFecha[1];
        arrPrmtros.push(prm1);
        break;

      case "mes":
        queryFinal += arrGastosFecha[2];
        arrPrmtros.push(prm1);
        break;

      default: //range
        queryFinal += arrGastosFecha[4];
        arrPrmtros.push(prm1, prm2);
        break;
    }
    //ejecutar query

    const [result] = await poolDB.query(queryFinal, arrPrmtros);

    //verificar consulta exitosa
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("Gastos no encontrados"),
        "getGastos",
        404
      );
    } else {
      //mostrar resultados
      res.json(result);
      console.log("Gastos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getGastos");
  }
};
//registrarGasto
export const createGasto = async (req, res) => {
  try {
    const { desc_gasto, monto_gasto } = req.body;
    //realizar registro
    const [result] = await poolDB.query(consultas_gastos.createGasto, [
      desc_gasto,
      monto_gasto,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Gasto no registrado"),
        "createGasto",
        404
      );
    } else {
      console.log("Gasto registrado en la BD");

      //consultar Gasto recientemente registrado
      const [GastoReciente] = await poolDB.query(consultas_gastos.getGastoID, [
        result.insertId,
      ]);
      //enviar datos al cliente
      res.json(GastoReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createGasto");
  }
};

//actualizar Gasto
export const updateGasto = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_gastos.updateGasto, [
      req.body,
      req.params.id_gasto,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Gasto no actualizado"),
        "updateGasto",
        404
      );
    } else {
      console.log("Gasto actualizado en la BD");
      //Gasto recientemente actualizado
      const [GastoReciente] = await poolDB.query(consultas_gastos.getGastoID, [
        req.params.id_gasto,
      ]);
      //enviar datos al cliente
      res.json(GastoReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateGasto");
  }
};

//eliminar Gasto
export const deleteGasto = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_gastos.deleteGasto, [
      req.params.id_gasto,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(res, new Error("Gasto no eliminado"), "deleteGasto", 404);
    } else {
      console.log("Gasto eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteGasto");
  }
};
