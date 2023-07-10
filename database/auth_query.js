export const verifyLogin =
  "SELECT `pass_admin` FROM `administrador_tbl` WHERE aes_decrypt(`pass_admin`,?)= ?;";

export const changePassword =
  "UPDATE `administrador_tbl` SET `pass_admin` = aes_encrypt(?, ?) WHERE `id_administrador`= 1;";
