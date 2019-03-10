const authRoutes = require('../routes/auth')
const standingsRoutes = require('../routes/standings')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/standings', standingsRoutes)
}
