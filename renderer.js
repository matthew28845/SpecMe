// General System specs, OS info
const manufacturer = document.getElementById('mfg')
manufacturer.innerText = 'Loading...'
const model = document.getElementById('model')
model.innerText = 'Loading...'
window.system.system().then(info => {
  manufacturer.innerText = `Manufacturer: ${info.manufacturer}`
  model.innerText = `Model: ${info.model}`
}).catch(err => {
  manufacturer.innerText = `Error: ${err.message}`
  model.innerText = `Error: ${err.message}`
})

const cpu = document.getElementById('cpu')
cpu.innerText = 'Loading...'
window.specs.cpu().then(info => {
  cpu.innerText = `CPU: ${info.manufacturer} ${info.brand} (${info.cores} cores)`
}).catch(err => {
  cpu.innerText = `Error: ${err.message}`
})

const mem = document.getElementById('mem')
mem.innerText = 'Loading...'
window.specs.ram().then(info => {
  mem.innerText = `RAM: ${info.total} bytes`
}).catch(err => {
  mem.innerText = `Error: ${err.message}`
})