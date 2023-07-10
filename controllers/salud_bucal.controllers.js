//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import {
  consultas_pzaSaludB,
  consultas_saludB,
} from "../database/saludBucal_query.js";

//
//obtener salud bucal de la consulta
export const getAllSaludBucal = async (req, res) => {
  try {
    //ejecutar consulta
    const [resultSaludB] = await poolDB.query(consultas_saludB.getSaludBucal, [
      req.params.id_consulta,
    ]);

    //verificar consulta exitosa
    if (resultSaludB.length === 0) {
      handleHttpError(
        res,
        new Error("Sin Salud Bucal"),
        "getAllSaludBucala",
        404
      );
    } else {
      //agregar piezas dentales
      const [pzaSaludBucal] = await poolDB.query(
        consultas_pzaSaludB.getPzaSaludB,
        [resultSaludB[0].id_saludb]
      );

      resultSaludB[0].piezas = pzaSaludBucal;

      //enviar SaludBucal con sus piezas
      res.json(resultSaludB);
      console.log("Salud Bucal traida desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getAllSaludBucal");
  }
};

//registrar salud bucal
export const createSaludBucal = async (req, res) => {
  try {
    //realizar registro
    const [result] = await poolDB.query(consultas_saludB.createSaludBucal, [
      req.params.id_consulta,
      "",
      "",
      "",
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Salud Bucal no registrado"),
        "createSaludBucal",
        404
      );
    } else {
      console.log("Salud Bucal registrado en la BD");

      //consultar Salud Bucal recientemente registrado
      const [saludBucalReciente] = await poolDB.query(
        consultas_saludB.getSaludBucalId,
        [result.insertId]
      );

      //enviar datos al cliente
      res.json(saludBucalReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createPzaBucal");
  }
};
//actualizar Salud Bucal
export const updateSaludBucal = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_saludB.updateSaludBucal, [
      req.body,
      req.params.id_saludb,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Salud Bucal no actualizada"),
        "updateSaludBucal",
        404
      );
    } else {
      console.log("Salud Bucal actualizada en la BD");

      //Salud Bucal recientemente actualizada
      const [saludBucalReciente] = await poolDB.query(
        consultas_saludB.getSaludBucalId,
        [req.params.id_saludb]
      );
      //enviar datos al cliente
      res.json(saludBucalReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateSaludBucal");
  }
};

//registrar pieza dental
export const createPzaSaludBucal = async (req, res) => {
  try {
    //extraer datos del body
    const { fila_pza, pieza, placa, calculo, gingivitis } = req.body;

    //realizar registro
    const [result] = await poolDB.query(consultas_pzaSaludB.createPzaSaludB, [
      req.params.id_saludb,
      fila_pza,
      pieza,
      placa,
      calculo,
      gingivitis,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("PiezaDental no registrada"),
        "createPzaSaludBucal",
        404
      );
    } else {
      console.log("PiezaDental registrada en la BD");

      //consultar PiezaDental recientemente registrado
      const [PzaSaludBucalReciente] = await poolDB.query(
        consultas_pzaSaludB.getPzaSaludBId,
        [result.insertId]
      );
      //enviar datos al cliente
      res.json(PzaSaludBucalReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createPzaSaludBucal");
  }
};

//actualizar pieza dental
export const updatePzaSaludBucal = async (req, res) => {
  try {
    //extraer datos del body
    const { fila_pza, pieza, placa, calculo, gingivitis } = req.body;

    //ejecutar update
    const [result] = await poolDB.query(consultas_pzaSaludB.updatePzaSaludB, [
      {
        fila_pzaSaludb: fila_pza,
        pieza_pzaSaludb: pieza,
        placa_pzaSaludb: placa,
        calculo_pzaSaludb: calculo,
        gingivitis_pzaSaludb: gingivitis,
      },
      req.params.id_pDentalSb,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("PiezaDental no actualizada"),
        "updatePzaSaludBucal",
        404
      );
    } else {
      console.log("PiezaDental actualizada en la BD");

      //PiezaDental recientemente actualizada
      const [PzaSaludBucalReciente] = await poolDB.query(
        consultas_pzaSaludB.getPzaSaludBId,
        [req.params.id_pDentalSb]
      );
      //enviar datos al cliente
      res.json(PzaSaludBucalReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updatePzaSaludBucal");
  }
};
