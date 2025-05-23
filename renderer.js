// General System specs, OS info
const manufacturer = document.getElementById('mfg')
manufacturer.innerText = 'Loading...'
const model = document.getElementById('model')
model.innerText = 'Loading...'
const version = document.getElementById('version')
version.innerText = 'Loading...'
window.system.system().then(info => {
  manufacturer.innerText = `${info.manufacturer} `
  model.innerText = `${info.model} /`
  version.innerText = `${info.version}`
}).catch(err => {
  manufacturer.innerText = `Error: ${err.message}`
  model.innerText = `Error: ${err.message}`
  version.innerText = `Error: ${err.message}`
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
  mem.innerText = `RAM: ${info[0].size/1073741824} GB ${info[0].type}`
}).catch(err => {
  mem.innerText = `Error: ${err.message}`
})
const disk = document.getElementById('disk')
disk.innerText = 'Loading...'
window.specs.disk().then(info => {
  disk.innerText = `Disk: ${info[0].name} ${Math.floor(info[0].size/1073741824)} GB`
}).catch(err => {
  disk.innerText = `Error: ${err.message}`
})
const gpu = document.getElementById('gpu')
gpu.innerText = 'Loading...'
window.specs.gpu().then(info => {
  gpu.innerText = `GPU: ${info.controllers[0].vendor} ${info.controllers[0].model}`
}).catch(err => {
  gpu.innerText = `Error: ${err.message}`
})
const os = document.getElementById('os')
os.innerText = 'Loading...'
window.system.os().then(info => {
  os.innerText = `OS: ${info.distro} ${info.release} ${info.codename}`
}).catch(err => {
  os.innerText = `Error: ${err.message}`
})

// CPU tab
const cpumanufacturer = document.getElementById('cpumanufacturer')
const cpumodel = document.getElementById('cpumodel')
const cpusocket = document.getElementById('cpusocket')
const cpuclock = document.getElementById('cpuclock')
const cpucores = document.getElementById('cpucores')
const cpucache1 = document.getElementById('cpucache1')
const cpucache2 = document.getElementById('cpucache2')
const cpucache3 = document.getElementById('cpucache3')
const cpuflags = document.getElementById('cpuflags')
window.specs.cpu().then(info => {
  cpumanufacturer.innerText = `${info.manufacturer}`
  cpumodel.innerText = `${info.brand}`
  cpusocket.innerText = `${info.socket}`
  cpuclock.innerText = `${info.speed} base, up to ${info.speedMax} GHz`
  cpucores.innerText = `${info.physicalCores}, ${info.performanceCores} performance, ${info.efficiencyCores} efficiency`
  cpucache1.innerText = `${info.cache.l1i/1024} KB instruction, ${info.cache.l1d/1024} KB data`
  cpucache2.innerText = `${info.cache.l2/1024} KB`
  cpucache3.innerText = `${info.cache.l3/1024} KB`
}).catch(err => {
  cpumanufacturer.innerText = `Error: ${err.message}`
  cpumodel.innerText = `Error: ${err.message}`
  cpusocket.innerText = `Error: ${err.message}`
  cpuclock.innerText = `Error: ${err.message}`
  cpucores.innerText = `Error: ${err.message}`
  cpucache1.innerText = `Error: ${err.message}`
  cpucache2.innerText = `Error: ${err.message}`
  cpucache3.innerText = `Error: ${err.message}`
})