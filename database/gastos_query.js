export const queryGastos =
  "SELECT `id_gasto`, `desc_gasto`, `monto_gasto`, DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(`fecha_gasto`)),'%Y/%m/%d %H:%i:%s')  as 'fecha_gasto', DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(`updfecha_gasto`)),'%Y/%m/%d %H:%i:%s')  as 'fecha_modificacion' FROM `gasto_tbl` ";

export const arrGastosPor = [
  " WHERE `id_gasto` > 0 ",
  " WHERE ( match(`desc_gasto`) against(?) OR `desc_gasto` like concat('%',?,'%') )",
];

const orderBy = " ORDER BY `fecha_gasto` ASC ;";
export const arrGastosFecha = [
  " ORDER BY `updfecha_gasto` DESC ;",
  " WHERE extract(year from  `fecha_gasto`) = ? " + orderBy,
  " WHERE extract(year_month from  `fecha_gasto`) = ? " + orderBy,
  " WHERE `fecha_gasto` like concat(?,'%') " + orderBy,
  " WHERE `fecha_gasto` between ? AND ? " + orderBy,
];

export const consultas_gastos = {
  createGasto:
    "INSERT INTO `gasto_tbl` (`desc_gasto`, `monto_gasto`) VALUES (?,?);",

  getGastoID: queryGastos + " WHERE `id_gasto` = ?;",
  updateGasto: "UPDATE `gasto_tbl` SET ? WHERE `id_gasto` = ?;",

  deleteGasto: "DELETE FROM `gasto_tbl` WHERE `id_gasto` = ?;",
};
