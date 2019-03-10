const authRoutes = require('../routes/auth');
const standingsRoutes = require('../routes/standings');
const teamRoutes = require('../routes/team');

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/standings', standingsRoutes)
  app.use('/team', teamRoutes)
}
