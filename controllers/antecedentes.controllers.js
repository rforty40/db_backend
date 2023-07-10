//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { consultasAntecedentes } from "../database/antecedentes_query.js";

//mostrar Antencedentes Personales
export const getAntecedentes = async (req, res) => {
  try {
    //
    let msgSuccess = "";
    let queryAntecedentes;
    if (req.params.tipo === "personales") {
      queryAntecedentes = consultasAntecedentes.getAntecedentesP;
      msgSuccess = "Antecedentes personales traidos de la BD";
    } else {
      queryAntecedentes = consultasAntecedentes.getAntecedentesF;
      msgSuccess = "Antecedentes familiares traidos de la BD";
    }

    //ejecutar query
    const [result] = await poolDB.query(queryAntecedentes, [
      req.params.id_paciente,
    ]);

    //verificar si se trajeron los datos
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("Antecedentes no encontrados"),
        "getAntecedentes",
        404
      );
    } else {
      //devolver datos
      res.json(result);
      console.log(msgSuccess);
    }
  } catch (error) {
    handleHttpError(res, error, "getAntecedentes");
  }
};

//registrar Antecedentes
export const createAntecedente = async (req, res) => {
  try {
    //extraer datos del body
    const { tip_antecedente, par_antecedente, des_antecedente } = req.body;

    //ejecutar registro
    const [result] = await poolDB.query(
      consultasAntecedentes.createAntecedente,
      [
        req.params.id_paciente, //id se extrae de la url
        tip_antecedente,
        par_antecedente,
        des_antecedente,
      ]
    );
    //verificar si se registraron los datos
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Antecedente no registrado"),
        "createAntecedente",
        404
      );
    } else {
      console.log("Antecedente registrado ");

      //consultar el antecedente recientemente registrado
      const [AntecedenteReciente] = await poolDB.query(
        consultasAntecedentes.getAntecedente,
        [result.insertId]
      );
      res.json(AntecedenteReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createAntecedente");
  }
};

//actualizar Antecedente
export const updateAntecedente = async (req, res) => {
  try {
    //ejecutar la actualizacion
    const [result] = await poolDB.query(
      consultasAntecedentes.updateAntecedente,
      [req.body, req.params.id_antecedente]
    );
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Antecedente no actualizado"),
        "updateAntecedente",
        404
      );
    } else {
      console.log("Antecedente actualizado ");

      //consultar el antecedente recientemente actualizado
      const [antecedenteReciente] = await poolDB.query(
        consultasAntecedentes.getAntecedente,
        [req.params.id_antecedente]
      );
      res.json(antecedenteReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateAntecedente");
  }
};

//eliminar Antecedente
export const deleteAntecedente = async (req, res) => {
  try {
    //ejecutar eliminacion
    const [result] = await poolDB.query(
      consultasAntecedentes.deleteAntecedente,
      [req.params.id_antecedente]
    );
    //verificar
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Antecedente no eliminado"),
        "deleteAntecedente",
        404
      );
    } else {
      console.log("Antecedente eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteAntecedente");
  }
};
