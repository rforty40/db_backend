export const consultas_planes = {
  getPlanesConsulta:
    "SELECT * FROM `planDiagnostico_tbl` as plan LEFT JOIN `tipoTratamiento_tbl` as tipTra ON plan.`id_tipoTratam` = tipTra.`id_tipoTratam` WHERE `id_consulta`= ?  AND `tipo_planDiag` = ? ;",

  getPlanID:
    "SELECT * FROM `planDiagnostico_tbl` as plan LEFT JOIN `tipoTratamiento_tbl` as tipTra ON plan.`id_tipoTratam` = tipTra.`id_tipoTratam` WHERE `id_planDiag`= ?;",

  createPlan:
    "INSERT INTO `planDiagnostico_tbl` (`id_consulta`,`tipo_planDiag`,`exam_planDiag`,`id_tipoTratam`,`desc_planDiag`) VALUES (?,?,?,?,?);",

  updatePlan: "UPDATE `planDiagnostico_tbl` SET ? WHERE `id_planDiag`= ?;",

  deletePlan: "DELETE FROM `planDiagnostico_tbl` WHERE `id_planDiag`= ?; ",
};
