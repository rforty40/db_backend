//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import {
  consultas_tratam,
  consultas_compli,
  consultas_proced,
  consultas_presc,
} from "../database/tratamientos_query.js";

//obtener Tratam de Tratamientos
export const getTratamConsulta = async (req, res) => {
  try {
    let resultCompli, resultProced, resultPresc;
    //ejecutar consulta
    const [resultTra] = await poolDB.query(
      consultas_tratam.getTratamConsultas,
      [req.params.id_consulta]
    );

    //verificar consulta exitosa
    if (resultTra.length === 0) {
      handleHttpError(
        res,
        new Error("Sin tratamientos"),
        "getTratamConsulta",
        404
      );
    } else {
      //agregar complicaciones, procedimientos, prescripciones
      for (let tratamiento of resultTra) {
        //complicaciones
        [resultCompli] = await poolDB.query(consultas_compli.getCompliTratam, [
          tratamiento.id_tratam,
        ]);
        tratamiento.complicaciones = resultCompli;
        //procedimientos
        [resultProced] = await poolDB.query(consultas_proced.getProcedTratam, [
          tratamiento.id_tratam,
        ]);
        tratamiento.procedimientos = resultProced;
        //prescripciones
        [resultPresc] = await poolDB.query(consultas_presc.getPrescTratam, [
          tratamiento.id_tratam,
        ]);
        tratamiento.prescripciones = resultPresc;
      }
      //mostrar Tratamientos
      res.json(resultTra);
      console.log("Tratamientos traidos desde la BD");
    }
  } catch (error) {
    handleHttpError(res, error, "getTratamConsulta");
  }
};

//

//registrar Tratamiento
export const createTratam = async (req, res) => {
  try {
    //realizar registro
    const [result] = await poolDB.query(consultas_tratam.createTratam, [
      req.params.id_consulta,
      req.body.codigoCIE,
      req.body.id_tipoTratam,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Tratamiento no registrado"),
        "createTratam",
        404
      );
    } else {
      console.log("Tratamiento registrado en la BD");

      //consultar Tratamiento recientemente registrado
      const [TratamReciente] = await poolDB.query(
        consultas_tratam.getTratamID,
        [result.insertId]
      );

      //enviar datos al cliente
      res.json(TratamReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createTratam");
  }
};

//actualizar Tratamiento
export const updateTratam = async (req, res) => {
  try {
    //ejecutar update
    console.log(
      "first --->  ",
      req.body.codigoCIE,
      req.body.id_tipoTratam,
      req.params.id_tratam
    );
    const [result] = await poolDB.query(consultas_tratam.updateTratam, [
      req.body.codigoCIE,
      req.body.id_tipoTratam,
      req.params.id_tratam,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Tratamiento no actualizado"),
        "updateTratam",
        404
      );
    } else {
      console.log("Tratamiento actualizado en la BD");

      //Tratamiento recientemente actualizado
      const [TratamReciente] = await poolDB.query(
        consultas_tratam.getTratamID,
        [req.params.id_tratam]
      );
      //enviar datos al cliente
      res.json(TratamReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateTratam");
  }
};
//eliminar Tratamiento
export const deleteTratam = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_tratam.deleteTratam, [
      req.params.id_tratam,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Tratamiento no eliminado"),
        "deleteTratam",
        404
      );
    } else {
      console.log("Tratamiento eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteTratam");
  }
};
//
//

//registrar Complicacion
export const createCompli = async (req, res) => {
  try {
    //realizar registro
    const [result] = await poolDB.query(consultas_compli.createCompli, [
      req.params.id_tratam,
      req.body.txt_compli,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Complicacion no registrada"),
        "createCompli",
        404
      );
    } else {
      console.log("Complicacion registrada en la BD");

      //consultar Complicacion recientemente registrado
      const [CompliReciente] = await poolDB.query(
        consultas_compli.getCompliID,
        [result.insertId]
      );

      //enviar datos al cliente
      res.json(CompliReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createCompli");
  }
};
//actualizar Complicacion
export const updateCompli = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_compli.updateCompli, [
      req.body.txt_compli,
      req.params.id_compli,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Complicacion no actualizada"),
        "updateCompli",
        404
      );
    } else {
      console.log("Complicacion actualizada en la BD");

      //Complicacion recientemente actualizada
      const [CompliReciente] = await poolDB.query(
        consultas_compli.getCompliID,
        [req.params.id_compli]
      );
      //enviar datos al cliente
      res.json(CompliReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updateCompli");
  }
};
//eliminar Complicacion
export const deleteCompli = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_compli.deleteCompli, [
      req.params.id_compli,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Complicacion no eliminada"),
        "deleteCompli",
        404
      );
    } else {
      console.log("Complicacion eliminada");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteCompli");
  }
};
//
//

//registrar Procedimiento
export const createProced = async (req, res) => {
  try {
    //realizar registro
    const [result] = await poolDB.query(consultas_proced.createProcedTra, [
      req.params.id_tratam,
      req.body.id_proced,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Procedimiento no registrado"),
        "createProced",
        404
      );
    } else {
      console.log("Procedimiento registrado en la BD");

      //consultar Procedimiento recientemente registrado
      const [ProcedReciente] = await poolDB.query(
        consultas_proced.getProcedTraID,
        [result.insertId]
      );

      //enviar datos al cliente
      res.json(ProcedReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createProced");
  }
};
//eliminar Procedimiento
export const deleteProced = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_proced.deleteProcedTra, [
      req.params.id_proced,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Procedimiento no eliminado"),
        "deleteProced",
        404
      );
    } else {
      console.log("Procedcacion eliminado");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deleteProced");
  }
};
//
//

//registrar Prescripcion
export const createPresc = async (req, res) => {
  try {
    //extraer datos del body
    const { desc_presc, dosi_presc } = req.body;
    //realizar registro
    const [result] = await poolDB.query(consultas_presc.createPresc, [
      req.params.id_tratam,
      desc_presc,
      dosi_presc,
    ]);

    //verificar registro
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Prescripcion no registrada"),
        "createPresc",
        404
      );
    } else {
      console.log("Prescripcion registrada en la BD");

      //consultar Prescripcion recientemente registrado
      const [PrescReciente] = await poolDB.query(consultas_presc.getPrescID, [
        result.insertId,
      ]);
      //enviar datos al cliente
      res.json(PrescReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "createPresc");
  }
};
//actualizar Prescripcion
export const updatePresc = async (req, res) => {
  try {
    //ejecutar update
    const [result] = await poolDB.query(consultas_presc.updatePresc, [
      req.body,
      req.params.id_presc,
    ]);
    //verificar cambios
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Prescripcion no actualizada"),
        "updatePresc",
        404
      );
    } else {
      console.log("Prescripcion actualizada en la BD");

      //Prescripcion recientemente actualizada
      const [PrescReciente] = await poolDB.query(consultas_presc.getPrescID, [
        req.params.id_presc,
      ]);
      //enviar datos al cliente
      res.json(PrescReciente[0]);
    }
  } catch (error) {
    handleHttpError(res, error, "updatePresc");
  }
};
//eliminar Prescripcion
export const deletePresc = async (req, res) => {
  try {
    //ejecutar delete
    const [result] = await poolDB.query(consultas_presc.deletePresc, [
      req.params.id_presc,
    ]);

    //verificar eliminación
    if (result.affectedRows === 0) {
      handleHttpError(
        res,
        new Error("Prescripcion no eliminada"),
        "deletePresc",
        404
      );
    } else {
      console.log("Prescripcion eliminada");
      return res.sendStatus(204); //204 No Content
    }
  } catch (error) {
    handleHttpError(res, error, "deletePresc");
  }
};
