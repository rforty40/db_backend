export const consultas_tratam = {
  getTratamConsultas:
    "SELECT  tra.`id_tratam`,  tra.`id_tipoTratam`, tipo_tratam.`tipo_tipoTratam`, tipo_tratam.`tratam_tipoTratam` as 'tratamiento', tra.`codigoCIE`, cie.`nombre_enfermedad`, DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(tra.`fecha_tratam`)),'%Y/%m/%d %H:%i:%s') as 'fecha_tratamiento' FROM  `tratamiento_tbl` as tra LEFT JOIN `enfermedades_cie10` as cie ON tra.`codigoCIE` = cie.`codigoCIE` LEFT JOIN `tipotratamiento_tbl` as tipo_tratam ON tra.`id_tipoTratam` = tipo_tratam.`id_tipoTratam` WHERE tra.`id_consulta`= ? ORDER BY tra.`fecha_tratam` DESC;",

  getTratamID:
    "SELECT  tra.`id_tratam`,  tra.`id_tipoTratam`, tipo_tratam.`tipo_tipoTratam`, tipo_tratam.`tratam_tipoTratam` as 'tratamiento', tra.`codigoCIE`, cie.`nombre_enfermedad`, DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(tra.`fecha_tratam`)),'%Y/%m/%d %H:%i:%s') as 'fecha_tratamiento' FROM  `tratamiento_tbl` as tra LEFT JOIN `enfermedades_cie10` as cie ON tra.`codigoCIE` = cie.`codigoCIE` LEFT JOIN `tipotratamiento_tbl` as tipo_tratam ON tra.`id_tipoTratam` = tipo_tratam.`id_tipoTratam` WHERE tra.`id_tratam` = ? ;",

  createTratam:
    "INSERT INTO `tratamiento_tbl` (`id_consulta`,`codigoCIE`,`id_tipoTratam`) VALUES (?,?,?);",

  updateTratam:
    "UPDATE `tratamiento_tbl` SET `codigoCIE`= ?, `id_tipoTratam` = ? WHERE `id_tratam` = ? ;",

  deleteTratam: "DELETE FROM `tratamiento_tbl` WHERE `id_tratam`=?;",
};

export const consultas_compli = {
  getCompliTratam:
    "SELECT `id_compli`,`txt_compli` FROM `complicaciones_tbl` WHERE `id_tratam`= ?;",

  getCompliID:
    "SELECT `id_compli`,`txt_compli` FROM `complicaciones_tbl` WHERE `id_compli` = ?;",
  createCompli:
    "INSERT INTO `complicaciones_tbl` (`id_tratam`,`txt_compli`) VALUES (?,?)",
  updateCompli:
    "UPDATE `complicaciones_tbl` SET `txt_compli` = ? WHERE `id_compli` = ?;",
  deleteCompli: "DELETE FROM `complicaciones_tbl`  WHERE `id_compli` = ?;",
};

export const consultas_proced = {
  getProcedTratam:
    "SELECT tra_pro.`id_tratam_proced`,tra_pro.`id_proced`,proced.`cod_proced`,proced.`nom_proced` FROM  `tratamiento_procedimiento_tbl` as tra_pro INNER JOIN `procedimiento_tbl` as proced ON tra_pro.`id_proced` = proced.`id_proced` WHERE `id_tratam`= ?;",

  getProcedTraID:
    "SELECT tra_pro.`id_tratam_proced`,tra_pro.`id_proced`,proced.`cod_proced`,proced.`nom_proced` FROM  `tratamiento_procedimiento_tbl` as tra_pro INNER JOIN `procedimiento_tbl` as proced ON tra_pro.`id_proced` = proced.`id_proced` WHERE tra_pro.`id_tratam_proced` = ?",
  createProcedTra:
    "INSERT INTO `tratamiento_procedimiento_tbl` (`id_tratam`,`id_proced`) VALUES (?,?);",

  deleteProcedTra:
    "DELETE FROM `tratamiento_procedimiento_tbl` WHERE `id_tratam_proced` = ? ;",
};

export const consultas_presc = {
  getPrescTratam:
    "SELECT `id_presc`, `desc_presc`, `dosi_presc` FROM `prescripciones_tbl` WHERE `id_tratam`= ?;",

  getPrescID:
    "SELECT `id_presc`, `desc_presc`, `dosi_presc` FROM `prescripciones_tbl` WHERE `id_presc` = ?;",
  createPresc:
    "INSERT INTO `prescripciones_tbl` (`id_tratam`,`desc_presc`,`dosi_presc`) VALUES (?,?,?);",
  updatePresc: "UPDATE `prescripciones_tbl` SET ? WHERE `id_presc` = ?;",
  deletePresc: "DELETE FROM `prescripciones_tbl`  WHERE `id_presc` = ?;",
};
