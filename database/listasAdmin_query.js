export const consultasTipoPago = {
  getAllTipoPago: "SELECT * FROM `tipoPago_tbl`;",
  getTipoPagoProced:
    "SELECT * FROM `tipoPago_tbl` WHERE `desc_tipPago` like 'Pago por Procedimiento%';",
  getTipoPagoConsul:
    "SELECT * FROM `tipoPago_tbl` WHERE `desc_tipPago` like 'Pago por Consulta%';",
  getTipoPagoUsuari:
    "SELECT * FROM `tipoPago_tbl` WHERE  `desc_tipPago` not like 'Pago por Procedimiento%' AND `desc_tipPago` not like 'Pago por Consulta%';",
  getTipoPagoBusq:
    "SELECT * FROM `tipoPago_tbl` WHERE match(`desc_tipPago`) against (?) OR `desc_tipPago` like concat('%',?,'%') ",
  getTipoPagoID: "SELECT * FROM `tipoPago_tbl` WHERE  `id_tipPago`= ?;",
  getTipoPagoIDtc: "SELECT * FROM `tipoPago_tbl` WHERE  `id_tipoConsul`= ?;",
  getTipoPagoIDpr: "SELECT * FROM `tipoPago_tbl` WHERE  `id_proced`= ?;",
  createTipoPago:
    "INSERT INTO `tipoPago_tbl` (`desc_tipPago`,`prec_tipPago`,`id_proced`,`id_tipoConsul`) VALUES (?,?,?,?);",
  updateTipoPago: "UPDATE  `tipoPago_tbl`  SET ? WHERE  `id_tipPago`= ?",
  deleteTipoPago: "DELETE FROM  `tipoPago_tbl`   WHERE  `id_tipPago`= ?",
};

export const consultasTipoConsulta = {
  getAllTiposConsulta:
    "SELECT tipoCon.*, tipPago.`prec_tipPago` FROM `tipoConsulta_tbl` AS tipoCon INNER JOIN `tipoPago_tbl` AS tipPago ON tipoCon.`id_tipoConsul`= tipPago.`id_tipoConsul` ORDER BY tipoCon.`id_tipoConsul` ASC;",
  getTipoConsultaID:
    "SELECT tipoCon.*, tipPago.`prec_tipPago` FROM `tipoConsulta_tbl` AS tipoCon INNER JOIN `tipoPago_tbl` AS tipPago ON tipoCon.`id_tipoConsul`= tipPago.`id_tipoConsul` WHERE  tipoCon.`id_tipoConsul`= ?; ",
  getTipoConsultaBusq:
    "SELECT * FROM `tipoConsulta_tbl` WHERE match(`tipo_tipoConsul`) against (?) OR `tipo_tipoConsul` like concat('%',?,'%') ",
  createTipoConsulta:
    "INSERT INTO `tipoConsulta_tbl` (`tipo_tipoConsul`) VALUES (?);",
  updateTipoConsulta:
    "UPDATE  `tipoConsulta_tbl`  SET ? WHERE  `id_tipoConsul`= ?",
  deleteTipoConsulta:
    "DELETE FROM  `tipoConsulta_tbl`   WHERE  `id_tipoConsul`= ?",
};

export const consultasTiposTratam = {
  getAllTiposTratam:
    "SELECT * FROM  `tipoTratamiento_tbl` ORDER BY `tratam_tipoTratam` ASC;",
  getTiposTratamTipo:
    "SELECT * FROM  `tipoTratamiento_tbl` WHERE `tipo_tipoTratam` = ?;",
  getTipoTratamID:
    "SELECT * FROM  `tipoTratamiento_tbl` WHERE  `id_tipoTratam`= ?;",
  getTipoTratamBusq:
    "SELECT * FROM `tipoTratamiento_tbl` WHERE match(`tratam_tipoTratam`) against (?) OR `tratam_tipoTratam` like concat('%',?,'%') ",
  createTipoTratam:
    "INSERT INTO `tipoTratamiento_tbl` (`tipo_tipoTratam`,`tratam_tipoTratam` ) VALUES (?,?);",
  updateTipoTratam:
    "UPDATE  `tipoTratamiento_tbl`  SET ? WHERE  `id_tipoTratam`= ?;",
  deleteTipoTratam:
    "DELETE FROM  `tipoTratamiento_tbl` WHERE  `id_tipoTratam`= ?;",
};
export const consultasProcedimientos = {
  getTodosLosProced:
    "SELECT `cod_nomProced`,`nombre_nomProced` FROM `nomProcedimiento_tbl` order by `cod_nomProced` ASC",

  getBusquedaProced:
    "SELECT  `cod_nomProced`,`nombre_nomProced` FROM `nomProcedimiento_tbl` WHERE `cod_nomProced` like concat('%',?,'%')  OR match(`nombre_nomProced`) against (?) OR `nombre_nomProced` like concat('%',?,'%') ORDER BY match(`nombre_nomProced`) against (?) desc;",

  getTitulos: "SELECT * FROM `tituloProcedimiento_tbl`;",

  getProcesTitulos:
    "SELECT nomPro.`cod_nomProced`, nomPro.`nombre_nomProced` FROM `nomProcedimiento_tbl` as nomPro INNER JOIN  `subtiProcedimiento_tbl`as subPro ON nomPro.`id_Proce` = subPro.`id_Proce` INNER JOIN `tituloProcedimiento_tbl` as titPro ON  subPro.`id_tituloProced` = titPro.`id_tituloProced` WHERE titPro.`id_tituloProced` = ? ORDER BY nomPro.`cod_nomProced` ASC;",

  getSubtitulos:
    "SELECT subPro.`id_Proce`, subPro.`subti_Proce` FROM `subtiProcedimiento_tbl` as subPro INNER JOIN `tituloProcedimiento_tbl` as titPro ON  subPro.`id_tituloProced` = titPro.`id_tituloProced` WHERE  subPro.`id_tituloProced` =  ?",

  getNomProced:
    "SELECT nomPro.`cod_nomProced`, nomPro.`nombre_nomProced` FROM `nomProcedimiento_tbl` as nomPro INNER JOIN  `subtiProcedimiento_tbl`as subPro ON nomPro.`id_Proce` = subPro.`id_Proce` WHERE  nomPro.`id_Proce` = ? ORDER BY nomPro.`cod_nomProced` ASC;",

  getTsnomProced:
    "	SELECT * FROM  `nomProcedimiento_tbl` as nomPro INNER JOIN  `subtiProcedimiento_tbl`as subPro ON nomPro.`id_Proce` = subPro.`id_Proce` INNER JOIN `tituloProcedimiento_tbl` as titPro  ON  subPro.`id_tituloProced` = titPro.`id_tituloProced` WHERE nomPro.`cod_nomProced` =  ?;", //"D110"

  getAllProced:
    "SELECT  proced.`id_proced`, proced.`cod_proced`, proced.`nom_proced`, tipPago.`prec_tipPago` as 'prec_proced', proced.`desc_proced` FROM `procedimiento_tbl` as proced INNER JOIN  `tipoPago_tbl` as tipPago ON proced.`id_proced`= tipPago.`id_proced` ORDER BY proced.`cod_proced` ASC;",

  getProcedBusq:
    "SELECT  proced.`id_proced`,proced.`cod_proced`,proced.`nom_proced`,tipPago.`prec_tipPago` as 'prec_proced' ,proced.`desc_proced` FROM `procedimiento_tbl` as proced INNER JOIN  `tipoPago_tbl` as tipPago ON proced.`id_proced`= tipPago.`id_proced` WHERE proced.`cod_proced` like concat('%',?,'%')  OR match(proced.`nom_proced`) against (?) OR proced.`nom_proced` like concat('%',?,'%') ORDER BY match(proced.`nom_proced`) against (?) desc;",

  getProcedID:
    "SELECT  proced.`id_proced`,proced.`cod_proced`,proced.`nom_proced`,tipPago.`prec_tipPago` as 'prec_proced',proced.`desc_proced` FROM `procedimiento_tbl` as proced INNER JOIN `tipoPago_tbl` as tipPago ON proced.`id_proced`= tipPago.`id_proced` WHERE proced.`id_proced` = ?;",

  createProced:
    "INSERT INTO  `procedimiento_tbl` (`cod_proced`,`nom_proced`,`desc_proced`) values (?,?,?);",

  updateProced: "UPDATE  `procedimiento_tbl` SET ? WHERE `id_proced` = ?;",

  deleteProced: "DELETE FROM `procedimiento_tbl` WHERE `id_proced` = ?;",
};
