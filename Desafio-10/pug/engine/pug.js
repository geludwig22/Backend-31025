module.exports = function (app) {
  //las vistas las agarra en views/pug
  app.set('views', './views/pug');
  app.set('view engine', 'pug');
}