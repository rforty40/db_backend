//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import {
  consultas_odontogramas,
  consultas_dentales,
} from "../database/odontograma_query.js";

//
//obtener Odontoogramas
export const getAllOdontogramas = async (req, res) => {
  try {
    let resultOdonto, resultPiezas;

    //ejecutar consulta
    if (req.params.tipo === "consulta") {
      [resultOdonto] = await poolDB.query(
        consultas_odontogramas.getOdontogramas,
        [req.params.id_tipo]
      );
    } else {
      [resultOdonto] = await poolDB.query(
        consultas_odontogramas.getOdontogramasPac,
        [req.params.id_tipo]
      );
    }

    //verificar consulta exitosa
    if (resultOdonto.length === 0) {
      handleHttpError(
        res,
        new Error("Sin odontogramas"),
        "getOdontogConsulta",
        404
      );
    } else {
      //agregar piezas dentales
      for (let odontograma of resultOdonto) {
        [resultPiezas] = await poolDB.query(
          consultas_dentales.getPiezasDentales,
          [odontograma.id_odontograma]
        );
        odontograma.piezas = resultPiezas;
      }
      //enviar odontogramas con sus piezas
      res.json(resultOdonto);
      console.log("odontogramas traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getOdontogConsulta");
  }
};

//registrar Odontograma
export const createOdont = async (req, res) => {
  try {
    //realizar registro
    const [result] = await poolDB.query(
      consultas_odontogramas.createOdontograma,
      [req.params.id_consulta]
    );

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Odontograma no registrado"),
        "createOdont",
        404
      );
    } else {
      console.log("Odontograma registrado en la BD");

      //consultar Odontograma recientemente registrado
      const [OdontReciente] = await poolDB.query(
        consultas_odontogramas.getOdontogramaId,
        [result.insertId]
      );

      //enviar datos al cliente
      res.json(OdontReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createOdont");
  }
};

//eliminar Odontograma
export const deleteOdont = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(
      consultas_odontogramas.deleteOdontograma,
      [req.params.id_odonto]
    );

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Odontograma no eliminado"),
        "deleteOdont",
        404
      );
    } else {
      console.log("Odontograma eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteOdont");
  }
};

//registrar pieza dental
export const createPzaDental = async (req, res) => {
  try {
    //extraer datos del body
    const {
      num_dent,
      mov_dent,
      rec_dent,
      oclusal_dent,
      vestibular_dent,
      mesial_dent,
      lingual_dent,
      distal_dent,
    } = req.body;

    //realizar registro
    const [result] = await poolDB.query(consultas_dentales.createPiezaDental, [
      req.params.id_odontograma,
      num_dent,
      mov_dent,
      rec_dent,
      oclusal_dent,
      vestibular_dent,
      mesial_dent,
      lingual_dent,
      distal_dent,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("PiezaDental no registrada"),
        "createPzaDental",
        404
      );
    } else {
      console.log("PiezaDental registrada en la BD");

      //consultar PiezaDental recientemente registrado
      const [PzaDentalReciente] = await poolDB.query(
        consultas_dentales.getPiezasDentalId,
        [result.insertId]
      );
      //enviar datos al cliente
      res.json(PzaDentalReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createPzaDental");
  }
};

//actualizar pieza dental
export const updatePzaDental = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_dentales.updatePiezaDental, [
      req.body,
      req.params.id_pDental,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("PiezaDental no actualizada"),
        "updatePzaDental",
        404
      );
    } else {
      console.log("PiezaDental actualizada en la BD");

      //PiezaDental recientemente actualizada
      const [PzaDentalReciente] = await poolDB.query(
        consultas_dentales.getPiezasDentalId,
        [req.params.id_pDental]
      );
      //enviar datos al cliente
      res.json(PzaDentalReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updatePzaDental");
  }
};

//eliminar pieza dental
export const deletePzaDental = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_dentales.deletePiezaDental, [
      req.params.id_pDental,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("pieza dental no eliminada"),
        "deletePzaDental",
        404
      );
    } else {
      console.log("pieza dental eliminada");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deletePzaDental");
  }
};
