export const consultasAntecedentes = {
  getAntecedentesP:
    "SELECT * FROM `antecedente_tbl` WHERE `id_paciente` = ? AND `par_antecedente` is null;",

  getAntecedentesF:
    "SELECT * FROM `antecedente_tbl` WHERE `id_paciente` = ? AND `par_antecedente` is not null;",

  getAntecedente: "SELECT * FROM `antecedente_tbl` WHERE `id_antecedente` = ?",

  createAntecedente:
    "INSERT INTO `antecedente_tbl` (`id_paciente`,`tip_antecedente`,`par_antecedente`,`des_antecedente`) VALUES (?,?,?,?)",

  updateAntecedente:
    "UPDATE  `antecedente_tbl`  SET ? WHERE `id_antecedente` = ?",

  deleteAntecedente:
    "DELETE FROM  `antecedente_tbl` WHERE `id_antecedente` = ?",
};
