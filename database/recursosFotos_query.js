export const consultas_recursos = {
  getRecursos:
    "SELECT `id_recurso`, `id_consulta`, `titulo_recurso` as 'titulo', `descripcion_recurso` as 'descripcion', DATE_FORMAT( FROM_UNIXTIME(unix_timestamp(`fecha_recurso`)),'%Y/%m/%d %H:%i:%s') as 'fecha_recurso' FROM `recursoFoto_tbl` WHERE `id_consulta` = ? ORDER BY `fecha_recurso` DESC;",

  createRecurso:
    "INSERT INTO `recursoFoto_tbl` ( `id_consulta`, `titulo_recurso`, `descripcion_recurso`) VALUES (?,?,?);",

  updateRecurso: "UPDATE `recursoFoto_tbl` SET ? WHERE `id_recurso` = ? ;",

  deleteRecurso: "DELETE FROM `recursoFoto_tbl` WHERE `id_recurso` = ?;",

  getRecursoId:
    "SELECT `id_recurso`, `id_consulta`, `titulo_recurso` as 'titulo' , `descripcion_recurso` as 'descripcion' , DATE_FORMAT( FROM_UNIXTIME(unix_timestamp(`fecha_recurso`)),'%Y/%m/%d %H:%i:%s') as 'fecha_recurso' FROM `recursoFoto_tbl` WHERE `id_recurso` = ? ;",
};

export const consultas_fotos = {
  getFotos:
    "SELECT  `id_fotografia` as 'id', `url_foto` as 'url' FROM `fotografias_tbl` WHERE `id_recurso` = ?;",
  getFotoId:
    "SELECT  `id_fotografia` as 'id', `url_foto` as 'url'  FROM `fotografias_tbl` WHERE `id_fotografia` = ? ;",
  createFoto:
    "INSERT INTO `fotografias_tbl` (`id_fotografia`,`id_recurso`,`url_foto`)  VALUES (?,?,?) ;",

  deleteFoto: "DELETE FROM `fotografias_tbl` WHERE `id_fotografia` = ? ;",
};
