const isAdmin = true;

module.exports = (req, res, next) => {
  isAdmin
    ? next()
    : res.status(401).send({
        error: 401,
        decripcion: `metodo: ${req.method} no autorizado`,
      });
};
