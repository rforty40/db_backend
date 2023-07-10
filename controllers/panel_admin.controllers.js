//controlador de errores
import { handleHttpError } from "../utils/handleError.js";

//conexion DB
import { poolDB } from "../database/db.js";

//querys
import {
  consultas_panelAdmin,
  arrPacConProFecha,
} from "../database/panelAdmin_query.js";
//
import { consultasConsultas } from "../database/consultas_query.js";
//
//
export const getPanelAdmin = async (req, res) => {
  try {
    const fech1 = req.params.fech1;
    const fech2 = req.params.fech2;
    //
    const arrFiltroFecha = [
      "dia_act",
      "sem_act",
      "mes_act",
      "ani_act",
      "anio",
      "mes",
      "dia",
      "range",
      "todos",
    ];
    //
    const posFiltro = arrFiltroFecha.indexOf(req.params.filtro);
    let queryFinal;
    //
    switch (req.params.tabla) {
      case "pacientes":
        queryFinal =
          consultas_panelAdmin.getPacientes +
          arrPacConProFecha("create_paciente")[posFiltro];
        break;
      case "consultas":
        queryFinal =
          consultas_panelAdmin.getConsultas +
          arrPacConProFecha("con.fecha_consulta")[posFiltro];

        break;
      default: //procedimientos
        queryFinal =
          consultas_panelAdmin.getProcedimientos +
          arrPacConProFecha("tra_pro.fecha_tratam_proced")[posFiltro];
        break;
    }

    //ejecutar query
    const [result] = await poolDB.query(queryFinal, [fech1, fech2]);

    //verificar consulta exitosa
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error(req.params.tabla + " no encontrados"),
        "getPanelAdmin",
        404
      );
    } else {
      //CONSULTAS
      if (req.params.tabla === "consultas") {
        let resultD, resultT, resultP;
        for (let consulta of result) {
          //agregar Diagnosticos
          [resultD] = await poolDB.query(consultasConsultas.getDiagnosticos, [
            consulta.id_consulta,
          ]);
          consulta.diagnosticos = resultD;

          //agregar Tratamientos
          [resultT] = await poolDB.query(consultasConsultas.getTratamientos, [
            consulta.id_consulta,
          ]);
          consulta.tratamientos = resultT;

          //agregar Procedimientos
          for (let tratam of consulta.tratamientos) {
            [resultP] = await poolDB.query(
              consultasConsultas.getProcedimientos,
              [tratam.id_tratam]
            );
            tratam.procedimientos = resultP;
          }
        }
      }

      //mostrar resultados
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, error, "getPanelAdmin");
  }
};

export const getGanancias = async (req, res) => {
  try {
    const fech1 = req.params.fech1;
    const fech2 = req.params.fech2;
    //
    const arrFiltroFecha = [
      "dia_act",
      "sem_act",
      "mes_act",
      "ani_act",
      "anio",
      "mes",
      "dia",
      "range",
      "todos",
    ];
    //
    const posFiltro = arrFiltroFecha.indexOf(req.params.filtro);
    let queryFinal;
    //
    switch (req.params.tabla) {
      case "sum_ingresos":
        queryFinal =
          consultas_panelAdmin.getSumaIngresos +
          arrPacConProFecha("fecha_ingreso")[posFiltro];
        break;
      case "ingresos":
        queryFinal =
          consultas_panelAdmin.getIngresos +
          arrPacConProFecha("ing.fecha_ingreso")[posFiltro];
        break;
      case "sum_gastos":
        queryFinal =
          consultas_panelAdmin.getSumaGastos +
          arrPacConProFecha("fecha_gasto")[posFiltro];
        break;
      default: //gastos
        queryFinal =
          consultas_panelAdmin.getGastos +
          arrPacConProFecha("fecha_gasto")[posFiltro];
        break;
    }

    const [result] = await poolDB.query(queryFinal, [fech1, fech2]);
    //verificar consulta exitosa
    if (result.length === 0) {
      handleHttpError(
        res,
        new Error(req.params.tabla + " no encontrados"),
        "getGanancias",
        404
      );
    } else {
      //mostrar resultados
      res.json(result);
    }
  } catch (error) {
    handleHttpError(res, error, "getGanancias");
  }
};
