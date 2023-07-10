export const consultas_saludB = {
  getSaludBucal:
    "SELECT `id_saludBucal` as 'id_saludb', `id_consulta`,  `enferper_saludb` as 'enfermedad_periodontal', `maloclus_saludb` as 'mal_oclusion', `fluorosis_saludb` as 'fluorosis' FROM `saludBucal_tbl`  WHERE `id_consulta` = ?;",

  getSaludBucalId:
    "SELECT `id_saludBucal` as 'id_saludb', `id_consulta`,  `enferper_saludb` as 'enfermedad_periodontal', `maloclus_saludb` as 'mal_oclusion', `fluorosis_saludb` as 'fluorosis' FROM `saludBucal_tbl`  WHERE `id_saludBucal` = ?;",

  createSaludBucal:
    "INSERT INTO `saludBucal_tbl` (`id_consulta`,`enferper_saludb`,`maloclus_saludb`,`fluorosis_saludb`) VALUES (?,?,?,?) ;",

  updateSaludBucal: "UPDATE `saludBucal_tbl` SET ? WHERE `id_saludBucal`= ? ;",
};

export const consultas_pzaSaludB = {
  getPzaSaludB:
    "SELECT `id_pzaSaludB` as 'id_pzaSaludB', `id_saludBucal` as 'id_saludb', `fila_pzaSaludb` as 'fila_pza', `pieza_pzaSaludb` as 'pieza', `placa_pzaSaludb` as 'placa', `calculo_pzaSaludb` as 'calculo',`gingivitis_pzaSaludb`  as 'gingivitis' FROM  `piezaSaludB_tbl` WHERE `id_saludBucal`=  ?;",

  getPzaSaludBId:
    "SELECT `id_pzaSaludB` as 'id_pzaSaludB', `id_saludBucal` as 'id_saludb', `fila_pzaSaludb` as 'fila_pza', `pieza_pzaSaludb` as 'pieza', `placa_pzaSaludb` as 'placa', `calculo_pzaSaludb` as 'calculo',`gingivitis_pzaSaludb`  as 'gingivitis' FROM  `piezaSaludB_tbl` WHERE `id_pzaSaludB`=  ?;",

  createPzaSaludB:
    "INSERT INTO `piezaSaludB_tbl` (`id_saludBucal`,`fila_pzaSaludb`,`pieza_pzaSaludb`,`placa_pzaSaludb`,`calculo_pzaSaludb`,`gingivitis_pzaSaludb`) VALUES (?,?,?,?,?,?);",

  updatePzaSaludB: "UPDATE `piezaSaludB_tbl`  SET ? WHERE `id_pzaSaludB`= ? ;",
};
