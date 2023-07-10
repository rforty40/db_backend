export const handleHttpError = (res, error, nameFunction, code = 500) => {
  console.log(`Error en la funcion ---> ${nameFunction}() \n ${error}`);

  return res.status(code).json({ message: error.message });
};
