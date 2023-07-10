//variables de entorno
import { KEY_ADMIN } from "../config.js";

//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import { changePassword, verifyLogin } from "../database/auth_query.js";

//verificar contraseña para el inicio de sesion
export const getLogin = async (req, res) => {
  try {
    //ejecutar consulta
    const [result] = await poolDB.query(verifyLogin, [
      KEY_ADMIN,
      req.body.passwordUser,
    ]);

    //verificar si la contraseña es correcta
    if (result.length === 0) {
      handleHttpError(res, new Error("Contraseña incorrecta"), "getLogin", 404);
    } else {
      //mostrar mensaje de login correcto
      res.json({
        message: "Login correcto",
      });
    }
  } catch (error) {
    handleHttpError(res, error, "getLogin");
  }
};

//actualizar contraseña
export const updatePassword = async (req, res) => {
  try {
    const oldPass = req.body.passwordUser;
    const newPass = req.body.newPassword;

    const [result] = await poolDB.query(verifyLogin, [KEY_ADMIN, oldPass]);

    //verificar contraseña anterior
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error("Contraseña actual incorrecta"),
        "updatePassword",
        404
      );
    } else {
      const [result] = await poolDB.query(changePassword, [newPass, KEY_ADMIN]);
      //verificar cambios
      if (result.affectedRows === 0) {
        handleHttpError(
          res,
          new Error("Contraseña no actualizada"),
          "updatePassword",
          404
        );
      } else {
        res.json({
          message: "Contraseña actualizada",
        });
      }
    }
  } catch (error) {
    handleHttpError(res, error, "updatePassword");
  }
};
