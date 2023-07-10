export const consultas_examenes = {
  getAllEnferCIE:
    "SELECT `codigoCIE`, `nombre_enfermedad` FROM `enfermedades_cie10` ORDER BY `codigoCIE` ASC;",

  getEnferCIEBusq:
    "SELECT `codigoCIE`,`nombre_enfermedad` FROM `enfermedades_cie10` WHERE match(`nombre_enfermedad`,`codigoCIE`) against(?) OR `codigoCIE` like concat('%',?,'%') OR `nombre_enfermedad` like concat('%',?,'%') ORDER BY match(`nombre_enfermedad`,`codigoCIE`) against(?) DESC;",

  getExamenesConsulta:
    "SELECT exa.`id_examEst`, exa.`regionAfec_examEst`,cie.`codigoCIE`, cie.`nombre_enfermedad`, exa.`desc_examEst` FROM  `examenEstomatonagtico_tlb` as exa LEFT JOIN `enfermedades_cie10` as cie ON exa.`codigoCIE` = cie.`codigoCIE` WHERE exa.`id_consulta` = ?",

  getExamenID:
    "SELECT exa.`id_examEst`, exa.`regionAfec_examEst`,cie.`codigoCIE`, cie.`nombre_enfermedad`, exa.`desc_examEst` FROM  `examenEstomatonagtico_tlb` as exa LEFT JOIN `enfermedades_cie10` as cie ON exa.`codigoCIE` = cie.`codigoCIE` WHERE exa.`id_examEst` = ?",

  createExamen:
    "INSERT INTO `examenEstomatonagtico_tlb` (`id_consulta`,`regionAfec_examEst`,`codigoCIE`,`desc_examEst`) VALUES (?,?,?,?);",

  updateExamen:
    "UPDATE `examenEstomatonagtico_tlb` SET ? WHERE `id_examEst`= ?;",

  deleteExamen:
    "DELETE FROM `examenEstomatonagtico_tlb` WHERE `id_examEst`= ?; ",
};
