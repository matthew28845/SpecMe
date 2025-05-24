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
  cpucores.innerText = `${info.processors} processor(s), ${info.physicalCores} cores, ${info.performanceCores} performance, ${info.efficiencyCores} efficiency`
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

// Memory tab
const memsize = document.getElementById('memsize')
const memtype = document.getElementById('memtype')
const memclock = document.getElementById('memclock')
const memmfg = document.getElementById('memmfg')
const memformfactor = document.getElementById('memformfactor')
const mempart = document.getElementById('mempart')
const memserial = document.getElementById('memserial')
const memvmin = document.getElementById('memvmin')
const memvmax = document.getElementById('memvmax')
window.specs.ram().then(info => {
  memsize.innerText = `${info[0].size/1073741824} GB`
  memtype.innerText = `${info[0].type}`
  memclock.innerText = `${info[0].clockSpeed} MHz`
  memmfg.innerText = `${info[0].manufacturer}`
  memformfactor.innerText = `${info[0].formFactor}`
  mempart.innerText = `${info[0].partNumber}`
  memserial.innerText = `${info[0].serialNumber}`
  memvmin.innerText = `${info[0].voltageMin} V`
  memvmax.innerText = `${info[0].voltageMax} V`
}).catch(err => {
  memsize.innerText = `Error: ${err.message}`
  memtype.innerText = `Error: ${err.message}`
  memclock.innerText = `Error: ${err.message}`
  memmfg.innerText = `Error: ${err.message}`
  memformfactor.innerText = `Error: ${err.message}`
  mempart.innerText = `Error: ${err.message}`
  memserial.innerText = `Error: ${err.message}`
  memvmin.innerText = `Error: ${err.message}`
  memvmax.innerText = `Error: ${err.message}`
})

// Disk tab
const diskvendor = document.getElementById('diskvendor')
const diskmodel = document.getElementById('diskmodel')
const disksize = document.getElementById('disksize')
const disktype = document.getElementById('disktype')
const diskinterface = document.getElementById('diskinterface')
const diskserial = document.getElementById('diskserial')
const disksmart = document.getElementById('disksmart')
const disktemp = document.getElementById('disktemp')
const disksectors = document.getElementById('disksectors')
const diskcht = document.getElementById('diskcht')
const diskfirmware = document.getElementById('diskfirmware')
window.specs.disk().then(info => {
  diskvendor.innerText = `${info[0].vendor}`
  diskmodel.innerText = `${info[0].name}`
  disksize.innerText = `${Math.floor(info[0].size/1073741824)} GB`
  disktype.innerText = `${info[0].type}`
  diskinterface.innerText = `${info[0].interfaceType}`
  diskserial.innerText = `${info[0].serialNum}`
  disksmart.innerText = `${info[0].smartStatus}`
  disktemp.innerText = `${info[0].temperature} °C`
  disksectors.innerText = `${info[0].sectors}`
  diskcht.innerText = `${info[0].channelType}`
  diskfirmware.innerText = `${info[0].firmwareRevision}`
}).catch(err => {
  diskvendor.innerText = `Error: ${err.message}`
  diskmodel.innerText = `Error: ${err.message}`
  disksize.innerText = `Error: ${err.message}`
  disktype.innerText = `Error: ${err.message}`
  diskinterface.innerText = `Error: ${err.message}`
  diskserial.innerText = `Error: ${err.message}`
  disksmart.innerText = `Error: ${err.message}`
  disktemp.innerText = `Error: ${err.message}`
  disksectors.innerText = `Error: ${err.message}`
  diskcht.innerText = `Error: ${err.message}`
  diskfirmware.innerText = `Error: ${err.message}`
})

// GPU tab
const gpuvendor = document.getElementById('gpuvendor')
const gpumodel = document.getElementById('gpumodel')
const gpuvram = document.getElementById('gpuvram')
const gpucores = document.getElementById('gpucores')
const gpubus = document.getElementById('gpubus')
window.specs.gpu().then(info => {
  gpuvendor.innerText = `${info.controllers[0].vendor}`
  gpumodel.innerText = `${info.controllers[0].model}`
  gpuvram.innerText = `${Math.floor(info.controllers[0].vram/1073741824)} GB`
  if (info.controllers[0].vramDynamic != 'true') {
    gpuvram.innerText = `Dynamic VRAM`
  }
  gpucores.innerText = `${info.controllers[0].gpuCores} cores`
  gpubus.innerText = `${info.controllers[0].bus}`
}
).catch(err => {
  gpuvendor.innerText = `Error: ${err.message}`
  gpumodel.innerText = `Error: ${err.message}`
  gpuvram.innerText = `Error: ${err.message}`
  gpucores.innerText = `Error: ${err.message}`
  gpubus.innerText = `Error: ${err.message}`
})