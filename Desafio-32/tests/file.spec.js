const autocannon = require('autocannon')
const { PassThrough } = require('stream')

function run(url) {

  const buf = []
  const outputStream = new PassThrough()

  const inst = autocannon({
    url, 
    connections: 200,
    duration: 30
  })

  autocannon.track(inst, { outputStream })

  outputStream.on('data', data => buf.push(data))

  inst.on('done', () => {
    process.stdout.write(Buffer.concat(buf))
  })
}

console.log('running tests...')

run('http://localhost:3030/file/append?txt=HolaNoBloq')
run('http://localhost:3030/file/append-bloq?txt=HolaBloq')