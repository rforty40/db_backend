const queryCita =
  "SELECT  case when cit.`fecha_citaAgen` = current_date() then 'Hoy' when cit.`fecha_citaAgen` = DATE_SUB(current_date(), INTERVAL -1 DAY) then 'Mañana' when WEEKOFYEAR(cit.`fecha_citaAgen`) =  WEEKOFYEAR(current_date()) then 'Esta semana' when extract(month from cit.`fecha_citaAgen`) = extract(month from current_date()) then 'Este mes' else traducirMes(monthname(cit.`fecha_citaAgen`)) end as 'cuando',DATE_FORMAT(FROM_UNIXTIME(unix_timestamp(cit.`fecha_citaAgen`)),'%Y/%m/%d') as fecha ,TIME_FORMAT(FROM_UNIXTIME(unix_timestamp(cit.`horaIni_citaAgen`)),'%H:%i') as 'hora', TIME_FORMAT(FROM_UNIXTIME(unix_timestamp(cit.`horaFin_citaAgen`)),'%H:%i') as 'hora_fin',pac.`id_paciente`, concat_ws(' ',pac.`priNom_paciente`,pac.`segNom_paciente`,pac.`priApe_paciente`,pac.`segApe_paciente`) as 'paciente',pac.`eda_paciente`,if(pac.`telRes_paciente` = null, pac.`tel_paciente`,pac.`telRes_paciente`) as 'telefono', cit.`moti_citaAgen` as 'motivo', cit.`esta_citaAgen` as 'estado' FROM `citaAgendada_tbl` as cit INNER JOIN `paciente_tbl` as pac ON cit.`id_paciente` = pac.`id_paciente` WHERE ";

const orderbyFecha = " ORDER BY cit.`fecha_citaAgen` ASC; ";

//
export const consultasCitas = {
  //procedimiento almacenado que actualiza estado de las citas
  proc_actualizar_citas: " CALL `ActualizarEstadoCitas`();  ",

  getAllCitas:
    queryCita +
    "cit.`esta_citaAgen`= 1 OR cit.`esta_citaAgen`= 3 " +
    orderbyFecha,

  getCitasPendientes: queryCita + "cit.`esta_citaAgen`= 1" + orderbyFecha,

  getCitasHoy:
    queryCita + "cit.`fecha_citaAgen`=  current_date() " + orderbyFecha,

  getCitasManana:
    queryCita +
    "cit.`fecha_citaAgen`=  DATE_SUB(current_date(), INTERVAL -1 DAY)" +
    orderbyFecha,

  getCitasSemana:
    queryCita +
    "extract(year from cit.`fecha_citaAgen`) = extract(year from current_date()) AND WEEKOFYEAR(cit.`fecha_citaAgen`) =  WEEKOFYEAR(current_date())" +
    orderbyFecha,

  getCitaMes:
    queryCita +
    "extract(year_month from cit.`fecha_citaAgen`) = extract(year_month from current_date())" +
    orderbyFecha,

  getCitasEntreFechas:
    queryCita + "cit.`fecha_citaAgen` between ? and ? " + orderbyFecha,

  getCita:
    queryCita + "cit.`fecha_citaAgen` = ? AND cit.`horaIni_citaAgen` = ?;",

  createCita:
    "INSERT INTO  citaAgendada_tbl (fecha_citaAgen , horaIni_citaAgen ,  horaFin_citaAgen , id_paciente ,moti_citaAgen , esta_citaAgen)   VALUES (?,?,?,?,?,?)",

  updateCita:
    "UPDATE  citaAgendada_tbl SET ? WHERE fecha_citaAgen = ? AND horaIni_citaAgen = ?",

  deleteCita:
    "DELETE FROM citaAgendada_tbl WHERE  fecha_citaAgen  = ? AND  horaIni_citaAgen  = ?;",

  //Futuras Citas

  getCitasPendPac:
    queryCita +
    " cit.`id_paciente` = ?  AND  cit.`esta_citaAgen` = ?  ORDER BY cit.`fecha_citaAgen` ASC ;",

  getCitasPendPacFech:
    queryCita +
    "cit.`id_paciente` = ?  AND  cit.`esta_citaAgen` = ?  AND cit.`fecha_citaAgen` between ? and ?  ORDER BY cit.`fecha_citaAgen` ASC;",
};
