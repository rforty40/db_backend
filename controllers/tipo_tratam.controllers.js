//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultasTiposTratam } from "../database/listasAdmin_query.js";

//obtener Tipos de tratamientos
export const getTiposTratam = async (req, res) => {
  try {
    let query_tratam;
    //
    switch (req.params.filtro) {
      case "todos":
        query_tratam = consultasTiposTratam.getAllTiposTratam;
        break;
      case "tipo":
        query_tratam = consultasTiposTratam.getTiposTratamTipo;

        break;
      case "busqueda":
        query_tratam = consultasTiposTratam.getTipoTratamBusq;
        break;
      default:
        query_tratam = consultasTiposTratam.getTipoTratamID;
        break;
    }
    //
    const [result] = await poolDB.query(query_tratam, [
      req.params.id_tipoTratam,
      req.params.id_tipoTratam,
    ]);
    //verificar consultar
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("No se encontraron los tipos de tratamientos"),
        "getTiposTratam",
        404
      );
    } else {
      res.json(result);
      console.log("Tipos de Tratamientos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getTiposTratam");
  }
};

//registrar Tipo de tratamiento
export const createTipoTratam = async (req, res) => {
  try {
    const { tipo_tipoTratam, tratam_tipoTratam } = req.body;

    const [result] = await poolDB.query(consultasTiposTratam.createTipoTratam, [
      tipo_tipoTratam,
      tratam_tipoTratam,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Tipo de Tratamiento no registrado"),
        "createTiposTratam",
        404
      );
    } else {
      console.log("Tipo de Tratamiento registrado en la BD");

      const [TiposTratamReciente] = await poolDB.query(
        consultasTiposTratam.getTipoTratamID,
        [result.insertId] //id tipo Consulta
      );
      res.json(TiposTratamReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createTiposTratam");
  }
};

//actualizar Tipo de tratamiento
export const updateTipoTratam = async (req, res) => {
  try {
    //actualizar Tipo de tratamiento
    const [result] = await poolDB.query(consultasTiposTratam.updateTipoTratam, [
      req.body, //SET
      req.params.id_tipoTratam, //ID
    ]);

    //comprobar retorno de valores
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Tipo de Tratamiento no actualizado"),
        "updateTiposTratam",
        404
      );
    } else {
      console.log("Tipo de Tratamiento actualizado en la BD");
      //consultar el tipo de tratamiento recientemente actualizado
      const [TiposTratamReciente] = await poolDB.query(
        consultasTiposTratam.getTipoTratamID,
        [req.params.id_tipoTratam]
      );
      //mostrar los datos actualizados
      res.json(TiposTratamReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateTiposTratam");
  }
};

//eliminar Tipo de tratamiento
export const deleteTipoTratam = async (req, res) => {
  try {
    //delete Consulta
    const [result] = await poolDB.query(consultasTiposTratam.deleteTipoTratam, [
      req.params.id_tipoTratam, //ID
    ]);

    //comprobar retorno de valores
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Tipo de tratamiento no eliminado"),
        "deleteTiposTratam",
        404
      );
    } else {
      console.log("Tipo de tratamiento eliminado de la BD");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteTiposTratam");
  }
};
