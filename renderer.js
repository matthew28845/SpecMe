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