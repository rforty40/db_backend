export const arrPacConProFecha = (campofecha) => {
  return [
    ` WHERE ${campofecha} like concat(current_date(),'%')  ORDER BY ${campofecha} DESC `, //DIA ACTUAL
    ` WHERE extract(year from ${campofecha}) = extract(year from current_date()) AND WEEKOFYEAR(${campofecha}) =  WEEKOFYEAR(current_date()) ORDER BY ${campofecha} DESC `, //SEMANA ACTUAL
    ` WHERE extract(year_month from ${campofecha}) = extract(year_month from current_date()) ORDER BY ${campofecha} ASC `, //MES ACTUAL
    ` WHERE extract(year from ${campofecha}) = extract(year from current_date()) ORDER BY ${campofecha} ASC `, //AÑO ACTUAL
    ` WHERE extract(year from ${campofecha}) = ? ORDER BY ${campofecha} ASC `, //AÑO
    ` WHERE extract(year_month from ${campofecha}) = ? ORDER BY ${campofecha} ASC `, //MES
    ` WHERE ${campofecha} like concat(?,'%') ORDER BY ${campofecha} ASC `, //DIA
    ` WHERE ${campofecha} between ? AND ?  ORDER BY ${campofecha} ASC `, //RANGO DE FECHAS
    ` ORDER BY ${campofecha} DESC ` /* TODOS LOS REGISTROS */,
  ];
};

export const consultas_panelAdmin = {
  getPacientes:
    "SELECT `id_paciente`,`priNom_paciente`,`segNom_paciente`,`priApe_paciente`,`segApe_paciente`,`ced_paciente`,`eda_paciente`,`sex_paciente`,`tel_paciente`,`ema_paciente`,`nomRes_paciente`,`parRes_paciente`,`telRes_paciente`, DATE_FORMAT( FROM_UNIXTIME(unix_timestamp(`create_paciente`)),'%Y/%m/%d %H:%i:%s') as create_paciente , DATE_FORMAT( FROM_UNIXTIME(unix_timestamp(`update_paciente`)),'%Y/%m/%d %H:%i:%s') as update_paciente FROM `paciente_tbl` ",

  getConsultas:
    "SELECT con.`id_consulta`,con.`id_paciente`,tipCon.`tipo_tipoConsul`, con.`mot_consulta`, con.`probleAct_consulta`, concat_ws(' ','Hace',datediff(current_date(),con.`fecha_consulta`),'días') as 'dias', DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(con.`fecha_consulta`)),'%Y-%m-%d') as 'fecha_consulta', TIME_FORMAT(FROM_UNIXTIME(unix_timestamp(con.`hora_consulta`)),'%H:%i') as 'hora_consulta', concat_ws(' ', pac.priNom_paciente , pac.segNom_paciente ,pac.priApe_paciente , pac.segApe_paciente) as 'Paciente' FROM `consulta_tbl` as con INNER JOIN `tipoConsulta_tbl` as tipCon ON con.`id_tipoConsul` = tipCon.`id_tipoConsul` INNER JOIN `paciente_tbl` as pac ON con.`id_paciente`= pac.`id_paciente` ",

  getProcedimientos:
    "SELECT DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(tra_pro.`fecha_tratam_proced`)),'%Y/%m/%d %H:%i:%s') as 'Fecha', concat_ws(' - ',proced.`cod_proced`,proced.`nom_proced`) as 'Procedimiento', ing.`monto_ingreso` as 'Ingreso', concat_ws(' ',cie.`nombre_enfermedad`,DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(tratam.`fecha_tratam`)),'%Y/%m/%d %H:%i')) as 'Tratamiento', concat_ws(' ',con.`mot_consulta`, DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(con.`fecha_consulta`)),'%Y-%m-%d')) as 'Consulta',concat_ws(' ', pac.`priNom_paciente`, pac.`segNom_paciente` ,pac.`priApe_paciente`, pac.`segApe_paciente`) as 'Paciente', tra_pro.`id_tratam_proced`,proced.`id_proced`,tratam.`id_tratam`, con.`id_consulta`,pac.`id_paciente`,ing.`id_ingreso` FROM `tratamiento_procedimiento_tbl` as tra_pro INNER JOIN `procedimiento_tbl` as proced ON tra_pro.`id_proced` = proced.`id_proced` INNER JOIN `tratamiento_tbl` as tratam ON tra_pro.`id_tratam` = tratam.`id_tratam` INNER JOIN `consulta_tbl` as con ON tratam.`id_consulta` = con.`id_consulta` INNER JOIN `paciente_tbl` as pac ON con.`id_paciente`= pac.`id_paciente` LEFT JOIN `ingreso_tbl` as ing ON tra_pro.`id_tratam_proced` = ing.`id_tratam_proced` LEFT JOIN `enfermedades_cie10` as cie ON tratam.`codigoCIE` = cie.`codigoCIE` ",

  getIngresos:
    "SELECT pac.`id_paciente`,ing.`id_ingreso`,ing.`id_consulta`,ing.`text_ingreso` as 'pago_por',ing.`desc_ingreso`, ing.`monto_ingreso` as 'monto', DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(ing.`fecha_ingreso`)),'%Y/%m/%d %H:%i:%s') as 'fecha_create' , DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(ing.`updfecha_ingreso`)),'%Y/%m/%d %H:%i:%s') as 'fecha_update', ing.`id_tratam_proced` FROM `ingreso_tbl` as ing LEFT JOIN `consulta_tbl` as con ON  ing.`id_consulta` = con.`id_consulta` LEFT JOIN `paciente_tbl` as pac ON con.`id_paciente`= pac.`id_paciente` ",

  getSumaIngresos: "SELECT SUM(`monto_ingreso`) FROM `ingreso_tbl` ",

  getGastos:
    "SELECT `id_gasto`, `desc_gasto`, `monto_gasto`, DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(`fecha_gasto`)),'%Y/%m/%d %H:%i:%s')  as 'fecha_gasto', DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(`updfecha_gasto`)),'%Y/%m/%d %H:%i:%s')  as 'fecha_modificacion' FROM `gasto_tbl` ",

  getSumaGastos: "SELECT SUM(`monto_gasto`) FROM `gasto_tbl` ",
};
