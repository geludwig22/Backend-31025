const cluster = require("cluster")
const os = require('os')
const app = require('./app')
const modoCluster = process.env.MODO === 'cluster'

if (modoCluster && cluster.isMaster) {
  const numCPUs = os.cpus().length
  console.log(numCPUs)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    cluster.fork()
  })

  console.log("soy el proceso primario", process.pid)

} else {

  const PORT = process.env.PORT || 3030

  console.log(process.pid)

  app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))
}
