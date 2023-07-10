export const filtrarIngresos = () => {
  const notNull = " `id_consulta` is not null ";
  const arrIngresoPor = [
    " WHERE ( match(`text_ingreso`,`desc_ingreso`) against (?) OR `text_ingreso` like concat('%',?,'%') OR `desc_ingreso` like concat('%',?,'%') ) ", //busqueda
    " WHERE `id_ingreso` > 0 " /*todos*/,
    " WHERE " + notNull, //ingresos por consulta
    " WHERE " + notNull + " AND `text_ingreso` like 'Pago por Procedimiento%' ", //procedimientos
    " WHERE " + notNull + " AND `text_ingreso` like 'Pago por Consulta%' ", //tipo de consultas
    " WHERE " +
      notNull +
      " AND `text_ingreso` not like 'Pago por Procedimiento%' AND `text_ingreso` not like 'Pago por Consulta%' ", //otro motivo
    " WHERE " +
      notNull +
      " AND (`text_ingreso` like 'Pago por Procedimiento%' OR `text_ingreso` like 'Pago por Consulta%') ", //proced+tipConsul
    " WHERE " + notNull + " AND `text_ingreso` not like 'Pago por Consulta%' ", //proced+usuario
    " WHERE " +
      notNull +
      " AND `text_ingreso` not like 'Pago por Procedimiento%' ", //tipConsult+usuario
    " WHERE `id_consulta` is null ", //ingresos por el usuario
  ];

  const arrIngresoFecha = [
    " ORDER BY `updfecha_ingreso` DESC ",
    " AND extract(year from `fecha_ingreso`) = ? ",
    " AND extract(year_month from `fecha_ingreso`) = ? ",
    " AND `fecha_ingreso` between ? AND ? ",
    " ",
  ];

  let matrizQueryIngresos = Array.from(
    Array(arrIngresoPor.length),
    () => new Array(arrIngresoFecha.length)
  );

  for (let i = 0; i < arrIngresoPor.length; i++) {
    for (let j = 0; j < arrIngresoFecha.length; j++) {
      matrizQueryIngresos[i][j] = arrIngresoPor[i] + arrIngresoFecha[j];
    }
  }

  return matrizQueryIngresos;
};

export const queryIngreso =
  "SELECT `id_ingreso`,`id_consulta`,`text_ingreso` as 'pago_por', `desc_ingreso`,`monto_ingreso` as 'monto',DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(`fecha_ingreso`)),'%Y/%m/%d %H:%i:%s') as 'fecha_create' ,DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(`updfecha_ingreso`)),'%Y/%m/%d %H:%i:%s') as 'fecha_update',`id_tratam_proced` FROM `ingreso_tbl` ";

export const consultas_ingresos = {
  getTP_consul:
    "SELECT `desc_tipPago` as 'pago_por', `prec_tipPago` as 'monto' FROM `tipoPago_tbl` WHERE `id_tipoConsul` in (SELECT `id_tipoConsul` FROM `consulta_tbl` WHERE `id_consulta` = ?);",
  getTP_proced:
    "SELECT tra_pro.`id_tratam_proced`, proced.`id_proced` FROM `tratamiento_procedimiento_tbl` as tra_pro INNER JOIN `procedimiento_tbl` as proced ON tra_pro.`id_proced` = proced.`id_proced` WHERE tra_pro.`id_tratam` in (SELECT tratam.`id_tratam` FROM  `tratamiento_tbl` as tratam WHERE tratam.`id_consulta` = ?) ORDER BY tra_pro.`id_tratam_proced`;",

  getTpago:
    "SELECT `desc_tipPago` as 'pago_por', `prec_tipPago` as 'monto' FROM `tipoPago_tbl` WHERE `id_proced` = ?;",

  getIngresosConsul: queryIngreso + "WHERE `id_consulta` = ?;",

  getAllIngresos: queryIngreso + "ORDER BY `updfecha_ingreso` DESC;",

  getIngresoID: queryIngreso + " WHERE `id_ingreso` = ?;",

  createIngreso:
    "INSERT INTO `ingreso_tbl` (`id_consulta`,`text_ingreso`,`desc_ingreso`,`monto_ingreso`,`id_tratam_proced`) VALUES (?,?,?,?,?);",

  updateIngreso: "UPDATE `ingreso_tbl` SET ? WHERE `id_ingreso` = ?;",

  deleteIngreso: "DELETE FROM `ingreso_tbl` WHERE `id_ingreso` = ?;",

  getSumaIngresos:
    "SELECT SUM(`monto_ingreso`) FROM `ingreso_tbl` WHERE `id_consulta` = ?;",
};
