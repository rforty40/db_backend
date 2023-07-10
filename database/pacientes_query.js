export const consultasPacientes = {
  getAllPacientes:
    "SELECT `id_paciente`,`priNom_paciente`,`segNom_paciente`,`priApe_paciente`,`segApe_paciente`,`ced_paciente`,`eda_paciente`,`sex_paciente`,`tel_paciente`,`ema_paciente`,`nomRes_paciente`,`parRes_paciente`,`telRes_paciente`, DATE_FORMAT( FROM_UNIXTIME(unix_timestamp(`create_paciente`)),'%Y/%m/%d %H:%i:%s') as create_paciente , DATE_FORMAT( FROM_UNIXTIME(unix_timestamp(`update_paciente`)),'%Y/%m/%d %H:%i:%s') as update_paciente  FROM `paciente_tbl` ORDER BY `create_paciente` DESC;",

  getPacienteId:
    "SELECT `id_paciente`,`priNom_paciente`,`segNom_paciente`,`priApe_paciente`,`segApe_paciente`,`ced_paciente`,`eda_paciente`,`sex_paciente`,`tel_paciente`,`ema_paciente`,`nomRes_paciente`,`parRes_paciente`,`telRes_paciente`,DATE_FORMAT( FROM_UNIXTIME(unix_timestamp(`create_paciente`)),'%Y/%m/%d %H:%i:%s') as create_paciente, DATE_FORMAT( FROM_UNIXTIME(unix_timestamp(`update_paciente`)),'%Y/%m/%d %H:%i:%s') as update_paciente FROM `paciente_tbl` WHERE `id_paciente` = ?",

  getPacientesNC:
    "SELECT  `id_paciente`, concat_ws(' ', priNom_paciente , segNom_paciente ,priApe_paciente , segApe_paciente ,concat(' - ', ced_paciente )) as 'nombre_cedula' FROM `paciente_tbl` WHERE `ced_paciente` like concat('%',?,'%') or match (`priNom_paciente`,`segNom_paciente`,`priApe_paciente`,`segApe_paciente`) against (?) or concat_ws(' ',`priNom_paciente`,`segNom_paciente`,`priApe_paciente`,`segApe_paciente`) like concat('%',?,'%') ORDER BY match (`priNom_paciente`,`segNom_paciente`,`priApe_paciente`,`segApe_paciente`) against (?) DESC;",

  createPaciente:
    "INSERT INTO `paciente_tbl` (`ced_paciente`,`priNom_paciente`,`segNom_paciente`, `priApe_paciente`, `segApe_paciente`,`eda_paciente`,`sex_paciente`,`ema_paciente`,`tel_paciente`,`nomRes_paciente`,`parRes_paciente`,`telRes_paciente`) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?);",

  updatePaciente: "UPDATE  `paciente_tbl`  SET ? WHERE `id_paciente` = ?",

  deletePaciente: "DELETE FROM `paciente_tbl` WHERE `id_paciente` = ?",
};
