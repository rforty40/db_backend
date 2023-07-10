export const consultas_diagnos = {
  getDiagnosConsulta:
    "SELECT diag.`id_diag` , cie.`nombre_enfermedad`,cie.`codigoCIE`, diag.`tipo_diag`, diag.`desc_diag` FROM `diagnostico_tbl` as diag LEFT JOIN `enfermedades_cie10` as cie ON diag.`codigoCIE` = cie.`codigoCIE` WHERE diag.`id_consulta` = ?",

  getDiagnosID:
    "SELECT diag.`id_diag` , cie.`nombre_enfermedad`,cie.`codigoCIE`, diag.`tipo_diag`, diag.`desc_diag` FROM `diagnostico_tbl` as diag LEFT JOIN `enfermedades_cie10` as cie ON diag.`codigoCIE` = cie.`codigoCIE` WHERE diag.`id_diag` = ?",

  createDiagnos:
    "INSERT INTO `diagnostico_tbl` (`id_consulta`,`tipo_diag`,`codigoCIE`,`desc_diag`) VALUES (?,?,?,?);",

  updateDiagnos: "UPDATE `diagnostico_tbl` SET ? WHERE `id_diag`= ?;",

  deleteDiagnos: "DELETE FROM `diagnostico_tbl` WHERE `id_diag`= ?; ",
};
