//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import {
  consultas_recursos,
  consultas_fotos,
} from "../database/recursosFotos_query.js";

//cloudinary API
import cloudinary from "../utils/cloudinaryConfig.js";
import { FOLDER_NAME_CLOUDINARY } from "../config.js";

//obtener recursos foto de la consulta
export const getAllRecursosFoto = async (req, res) => {
  try {
    //ejecutar consulta
    const [resultRecurso] = await poolDB.query(consultas_recursos.getRecursos, [
      req.params.id_consulta,
    ]);

    //verificar consulta exitosa
    if (resultRecurso.length === 0) {
      handleHttpError(
        res,
        new Error("Sin recursos fotográficos"),
        "getAllRecursosFoto",
        404
      );
    } else {
      //agregar recursos fotográficos
      for (let recurso of resultRecurso) {
        const [resultFotografias] = await poolDB.query(
          consultas_fotos.getFotos,
          [recurso.id_recurso]
        );

        recurso.fotos = resultFotografias;
      }

      //enviar RecursosFoto
      res.json(resultRecurso);
      console.log("Recursos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getAllRecursosFoto");
  }
};

//registrar recurso foto
export const createRecursoFoto = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    //realizar registro
    const [result] = await poolDB.query(consultas_recursos.createRecurso, [
      req.params.id_consulta,
      titulo,
      descripcion,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("recurso foto no registrado"),
        "createRecursosFoto",
        404
      );
    } else {
      console.log("recurso foto registrado en la BD");

      //consultar recursos foto recientemente registrado
      const [recursoFotoReciente] = await poolDB.query(
        consultas_recursos.getRecursoId,
        [result.insertId]
      );

      //enviar datos al cliente
      res.json(recursoFotoReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createRecursosFoto");
  }
};

//actualizar recursofoto
export const updateRecursoFoto = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_recursos.updateRecurso, [
      req.body,
      req.params.id_recurso,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("recurso foto no actualizado"),
        "updateRecursoFoto",
        404
      );
    } else {
      console.log("recurso foto actualizado en la BD");

      //recursos foto recientemente actualizado
      const [recursoFotoReciente] = await poolDB.query(
        consultas_recursos.getRecursoId,
        [req.params.id_recurso]
      );

      //cargando fotos
      const [resultFotografias] = await poolDB.query(consultas_fotos.getFotos, [
        req.params.id_recurso,
      ]);
      recursoFotoReciente[0].fotos = resultFotografias;

      //enviar datos al cliente
      res.json(recursoFotoReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateRecursoFoto");
  }
};

//eliminar recurso foto
export const deleteRecursoFoto = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_recursos.deleteRecurso, [
      req.params.id_recurso,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("recurso no eliminado"),
        "deleteRecursoFoto",
        404
      );
    } else {
      console.log("recurso eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteRecursoFoto");
  }
};

//registrar foto
export const createFotografia = async (req, res) => {
  try {
    const { id, url } = req.body;

    //realizar registro
    const [result] = await poolDB.query(consultas_fotos.createFoto, [
      id,
      req.params.id_recurso,
      url,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("foto no registrada"),
        "createFotografia",
        404
      );
    } else {
      console.log("foto registrada en la BD");

      //consultar foto recientemente registrado
      const [fotoReciente] = await poolDB.query(consultas_fotos.getFotoId, [
        result.insertId,
      ]);

      //enviar datos al cliente
      res.json(fotoReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createFotografia");
  }
};

//eliminar foto
export const deleteFotografia = async (req, res) => {
  try {
    //ejecutar delete de imagen el cloudinary
    await cloudinary.uploader.destroy(
      `${FOLDER_NAME_CLOUDINARY}/${req.params.id_foto}`
    );

    //ejecutar delete BD
    const [result] = await poolDB.query(consultas_fotos.deleteFoto, [
      req.params.id_foto,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("foto no eliminada"),
        "deleteFotografia",
        404
      );
    } else {
      console.log("foto eliminada");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteFotografia");
  }
};
