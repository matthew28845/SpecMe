//This file sets all of the fields in index.html using the preload.js function. 

// CPU tab
const cputable = document.getElementById('cputable')
const cpumain = document.getElementById('cpumain')
cpumain.innerText = 'Loading...'

window.specs.cpu().then(info => {
  cpumain.innerText = `${info.manufacturer} ${info.brand} (${info.cores} threads)`
  cputable.querySelector('.cpumanufacturer').innerText = `${info.manufacturer}`
  cputable.querySelector('.cpumodel').innerText = `${info.brand}`
  cputable.querySelector('.cpusocket').innerText = `${info.socket}`
  cputable.querySelector('.cpuclock').innerText = `${info.speed} base, up to ${info.speedMax} GHz`
  cputable.querySelector('.cpucores').innerText = `${info.processors} processor(s), ${info.physicalCores} cores, ${info.performanceCores} performance, ${info.efficiencyCores} efficiency`
  cputable.querySelector('.cpucache1').innerText = `${info.cache.l1i/1024} KB instruction, ${info.cache.l1d/1024} KB data`
  cputable.querySelector('.cpucache2').innerText = `${info.cache.l2/1024} KB`
  cputable.querySelector('.cpucache3').innerText = `${info.cache.l3/1024} KB`
  cputable.querySelector('.cpuflags').innerText = `${info.flags}`
}).catch(err => {
  cpumain.innerText = `Error: ${err.message}`
  cputable.querySelector('.cpumanufacturer').innerText = `Error: ${err.message}`
  cputable.querySelector('.cpumodel').innerText = `Error: ${err.message}`
  cputable.querySelector('.cpusocket').innerText = `Error: ${err.message}`
  cputable.querySelector('.cpuclock').innerText = `Error: ${err.message}`
  cputable.querySelector('.cpucores').innerText = `Error: ${err.message}`
  cputable.querySelector('.cpucache1').innerText = `Error: ${err.message}`
  cputable.querySelector('.cpucache2').innerText = `Error: ${err.message}`
  cputable.querySelector('.cpucache3').innerText = `Error: ${err.message}`
  cputable.querySelector('.cpuflags').innerText = `Error: ${err.message}`
})

// Memory tab
const memtable = document.getElementById('memtable')
const memmain = document.getElementById('memmain')
memiterator = 1
memmain.innerText = 'Loading...'

window.specs.mem().then(info => {
  memmain.innerText = `${Math.floor(info.total/1048576)} MB`
}).catch(err => {
  memmain.innerText = `Error: ${err.message}`
})
window.specs.memlayout().then(info => {
  memmain.innerText += ` ${info[0].type}`
  memtable.querySelector('.memsize').innerText = `${Math.floor(info[0].size/1048576)} MB`
  memtable.querySelector('.memtype').innerText = `${info[0].type}`
  memtable.querySelector('.memclock').innerText = `${info[0].clockSpeed} MHz`
  memtable.querySelector('.memmfg').innerText = `${info[0].manufacturer}`
  memtable.querySelector('.memformfactor').innerText = `${info[0].formFactor}`
  memtable.querySelector('.mempart').innerText = `${info[0].partNumber}`
  memtable.querySelector('.memserial').innerText = `${info[0].serialNumber}`
  memtable.querySelector('.memvmin').innerText = `${info[0].voltageMin} V`
  memtable.querySelector('.memvmax').innerText = `${info[0].voltageMax} V`
  while (info[memiterator] !== undefined) {
    clone = memtable.cloneNode(true)
    clone.id = 'memtable ' + memiterator
    disknumber = document.createElement('h3')
    document.getElementById('memend').appendChild(disknumber)
    disknumber.innerText = `Disk ${memiterator}`
    document.getElementById('memend').appendChild(clone)
    memtable.querySelector('.memsize').innerText = `${Math.floor(info[memiterator].size/1048576)} MB`
    memtable.querySelector('.memtype').innerText = `${info[memiterator].type}`
    memtable.querySelector('.memclock').innerText = `${info[memiterator].clockSpeed} MHz`
    memtable.querySelector('.memmfg').innerText = `${info[memiterator].manufacturer}`
    memtable.querySelector('.memformfactor').innerText = `${info[memiterator].formFactor}`
    memtable.querySelector('.mempart').innerText = `${info[memiterator].partNumber}`
    memtable.querySelector('.memserial').innerText = `${info[memiterator].serialNumber}`
    memtable.querySelector('.memvmin').innerText = `${info[memiterator].voltageMin} V`
    memtable.querySelector('.memvmax').innerText = `${info[memiterator].voltageMax} V`
    memiterator++
  }
}).catch(err => {
  memmain.innerText = `Error: ${err.message}`
  memtable.querySelector('.memsize').innerText = `Error: ${err.message}`
  memtable.querySelector('.memtype').innerText = `Error: ${err.message}`
  memtable.querySelector('.memclock').innerText = `Error: ${err.message}`
  memtable.querySelector('.memmfg').innerText = `Error: ${err.message}`
  memtable.querySelector('.memformfactor').innerText = `Error: ${err.message}`
  memtable.querySelector('.mempart').innerText = `Error: ${err.message}`
  memtable.querySelector('.memserial').innerText = `Error: ${err.message}`
  memtable.querySelector('.memvmin').innerText = `Error: ${err.message}`
  memtable.querySelector('.memvmax').innerText = `Error: ${err.message}`
})

// Disk tab
const disktable = document.getElementById('disktable')
const diskmain = document.getElementById('diskmain')
diskiterator = 1

window.specs.disk().then(info => {
  diskmain.innerText = 'Loading...'
  diskmain.innerText = `${info[0].name} (${Math.floor(info[0].size/1073741824)} GB)`
  disktable.querySelector('.diskvendor').innerText = `${info[0].vendor}`
  disktable.querySelector('.diskmodel').innerText = `${info[0].name}`
  disktable.querySelector('.disksize').innerText = `${Math.floor(info[0].size/1073741824)} GB`
  disktable.querySelector('.disktype').innerText = `${info[0].type}`
  disktable.querySelector('.diskinterface').innerText = `${info[0].interfaceType}`
  disktable.querySelector('.diskserial').innerText = `${info[0].serialNum}`
  disktable.querySelector('.disksmart').innerText = `${info[0].smartStatus}`
  disktable.querySelector('.disktemp').innerText = `${info[0].temperature} °C`
  disktable.querySelector('.disksectors').innerText = `${info[0].sectors}`
  disktable.querySelector('.diskcht').innerText = `${info[0].channelType}`
  disktable.querySelector('.diskfirmware').innerText = `${info[0].firmwareRevision}`
  while (info[diskiterator] !== undefined) {
    clone = disktable.cloneNode(true)
    clone.id = 'disktable ' + diskiterator
    disknumber = document.createElement('h3')
    document.getElementById('diskend').appendChild(disknumber)
    disknumber.innerText = `Disk ${diskiterator}`
    document.getElementById('diskend').appendChild(clone)
    disktable.querySelector('.diskvendor').innerText = `${info[diskiterator].vendor}`
    disktable.querySelector('.diskmodel').innerText = `${info[diskiterator].name}`
    disktable.querySelector('.disksize').innerText = `${Math.floor(info[diskiterator].size/1073741824)} GB`
    disktable.querySelector('.disktype').innerText = `${info[diskiterator].type}`
    disktable.querySelector('.diskinterface').innerText = `${info[diskiterator].interfaceType}`
    disktable.querySelector('.diskserial').innerText = `${info[diskiterator].serialNum}`
    disktable.querySelector('.disksmart').innerText = `${info[diskiterator].smartStatus}`
    disktable.querySelector('.disktemp').innerText = `${info[diskiterator].temperature} °C`
    disktable.querySelector('.disksectors').innerText = `${info[diskiterator].sectors}`
    disktable.querySelector('.diskcht').innerText = `${info[diskiterator].channelType}`
    disktable.querySelector('.diskfirmware').innerText = `${info[diskiterator].firmwareRevision}`
    diskmain.innerText += `
    ${info[diskiterator].name} (${Math.floor(info[diskiterator].size/1073741824)} GB)`
    diskiterator++
  }
}).catch(err => {
  disktable.querySelector('.diskvendor').innerText = `Error: ${err.message}`
  disktable.querySelector('.diskmodel').innerText = `Error: ${err.message}`
  disktable.querySelector('.disksize').innerText = `Error: ${err.message}`
  disktable.querySelector('.disktype').innerText = `Error: ${err.message}`
  disktable.querySelector('.diskinterface').innerText = `Error: ${err.message}`
  disktable.querySelector('.diskserial').innerText = `Error: ${err.message}`
  disktable.querySelector('.disksmart').innerText = `Error: ${err.message}`
  disktable.querySelector('.disktemp').innerText = `Error: ${err.message}`
  disktable.querySelector('.disksectors').innerText = `Error: ${err.message}`
  disktable.querySelector('.diskcht').innerText = `Error: ${err.message}`
  disktable.querySelector('.diskfirmware').innerText = `Error: ${err.message}`
})

// GPU tab
const gputable = document.getElementById('gputable')
const gpumain = document.getElementById('gpumain')
gpumain.innerText = 'Loading...'
gpuiterator = 1

window.specs.gpu().then(info => {
  gpumain.innerText = `${info.controllers[0].vendor} ${info.controllers[0].model} ${info.controllers[0].vram} MB`
  gputable.querySelector('.gpuvendor').innerText = `${info.controllers[0].vendor}`
  gputable.querySelector('.gpumodel').innerText = `${info.controllers[0].model}`
  gputable.querySelector('.gpuvram').innerText = `${info.controllers[0].vram} MB`
  if (info.controllers[0].vramDynamic === true) {
    gputable.querySelector('.gpuvram').innerText = `Dynamic VRAM`
  }
  gputable.querySelector('.gpucores').innerText = `${info.controllers[0].gpuCores} cores`
  gputable.querySelector('.gpubus').innerText = `${info.controllers[0].bus}`
  while (info.controllers[gpuiterator] !== undefined) {
    clone = gputable.cloneNode(true)
    clone.id = 'gputable ' + gpuiterator
    gpunumber = document.createElement('h3')
    document.getElementById('gpuend').appendChild(gpunumber)
    gpunumber.innerText = `GPU ${gpuiterator}`
    document.getElementById('gpuend').appendChild(clone)
    clone.querySelector('.gpuvendor').innerText = `${info.controllers[gpuiterator].vendor}`
    clone.querySelector('.gpumodel').innerText = `${info.controllers[gpuiterator].model}`
    clone.querySelector('.gpuvram').innerText = `${info.controllers[gpuiterator].vram} MB`
    if (info.controllers[gpuiterator].vramDynamic === true) {
      clone.querySelector('.gpuvram').innerText = `Dynamic VRAM`
    }
    clone.querySelector('.gpucores').innerText = `${info.controllers[gpuiterator].gpuCores} cores`
    clone.querySelector('.gpubus').innerText = `${info.controllers[gpuiterator].bus}`
    gpumain.innerText += `
    ${info.controllers[gpuiterator].vendor} ${info.controllers[gpuiterator].model} ${info.controllers[gpuiterator].vram} MB`
    gpuiterator++
  }
}).catch(err => {
  gpumain.innerText = `Error: ${err.message}`
  gputable.querySelector('.gpuvendor').innerText = `Error: ${err.message}`
  gputable.querySelector('.gpumodel').innerText = `Error: ${err.message}`
  gputable.querySelector('.gpuvram').innerText = `Error: ${err.message}`
  gputable.querySelector('.gpuvram').innerText = `Error: ${err.message}`
  gputable.querySelector('.gpubus').innerText = `Error: ${err.message}`
})


//System tab
const systemtable = document.getElementById('systemtable')
const boardtable = document.getElementById('boardtable')
const biostable = document.getElementById('biostable')
const manufacturer = document.getElementById('mfgmain')
manufacturer.innerText = 'Loading...'
const model = document.getElementById('modelmain')
model.innerText = 'Loading...'
const version = document.getElementById('versionmain')
version.innerText = 'Loading...'
const mfglogo = document.getElementById('mfglogo')

window.system.system().then(info => {
  manufacturer.innerText = `${info.manufacturer} `
  model.innerText = `${info.model} /`
  version.innerText = `${info.version}`
  //mfglogo.src = `./images/cpu/${(info.manufacturer)}.png` || `./images/logo.png`
  systemtable.querySelector('.systemmfg').innerText = `${info.manufacturer}`
  systemtable.querySelector('.systemmodel').innerText = `${info.model}`
  systemtable.querySelector('.systemname').innerText = `${info.version}`
  systemtable.querySelector('.systemserial').innerText = `${info.serial}`
  systemtable.querySelector('.systemuuid').innerText = `${info.uuid}`
  systemtable.querySelector('.systemvm').innerText = `${info.virtual}` // true or false
  systemtable.querySelector('.systemformfactor').innerText = `${info.type}`
  
}
).catch(err => {
  manufacturer.innerText = `Error: ${err.message}`
  model.innerText = `Error: ${err.message}`
  version.innerText = `Error: ${err.message}`
  systemtable.querySelector('.systemmfg').innerText = `Error: ${err.message}`
  systemtable.querySelector('.systemmodel').innerText = `Error: ${err.message}`
  systemtable.querySelector('.systemname').innerText = `Error: ${err.message}`
  systemtable.querySelector('.systemserial').innerText = `Error: ${err.message}`
  systemtable.querySelector('.systemuuid').innerText = `Error: ${err.message}`
  systemtable.querySelector('.systemvm').innerText = `Error: ${err.message}`
  systemtable.querySelector('.systemformfactor').innerText = `Error: ${err.message}`
})
window.system.baseboard().then(info => {
  boardtable.querySelector('.boardmfg').innerText = `${info.manufacturer}`
  boardtable.querySelector('.boardmodel').innerText = `${info.model}`
  boardtable.querySelector('.boardserial').innerText = `${info.serial}`
  boardtable.querySelector('.boardasset').innerText = `${info.assetTag}`
  boardtable.querySelector('.boardmemslots').innerText = `${info.memSlots}`
  boardtable.querySelector('.boardmaxmem').innerText = `${Math.floor(info.memMax/1073741824)} GB`
}).catch(err => {
  boardtable.querySelector('.boardmfg').innerText = `Error: ${err.message}`
  boardtable.querySelector('.boardmodel').innerText = `Error: ${err.message}`
  boardtable.querySelector('.boardserial').innerText = `Error: ${err.message}`
  boardtable.querySelector('.boardasset').innerText = `Error: ${err.message}`
  boardtable.querySelector('.boardmemslots').innerText = `Error: ${err.message}`
  boardtable.querySelector('.boardmaxmem').innerText = `Error: ${err.message}`
})
window.system.bios().then(info => {
  biostable.querySelector('.biosvendor').innerText = `${info.vendor}`
  biostable.querySelector('.biosversion').innerText = `${info.version}`
  biostable.querySelector('.biosdate').innerText = `${info.releaseDate}`
  biostable.querySelector('.biosrev').innerText = `${info.revision}`
  biostable.querySelector('.biosserial').innerText = `${info.serial}`
  biostable.querySelector('.bioslanguage').innerText = `${info.language}`
  biostable.querySelector('.biosfeatures').innerText = `${info.features}`
}).catch(err => {
  biostable.querySelector('.biosvendor').innerText = `Error: ${err.message}`
  biostable.querySelector('.biosversion').innerText = `Error: ${err.message}`
  biostable.querySelector('.biosdate').innerText = `Error: ${err.message}`
  biostable.querySelector('.biosrev').innerText = `Error: ${err.message}`
  biostable.querySelector('.biosserial').innerText = `Error: ${err.message}`
  biostable.querySelector('.bioslanguage').innerText = `Error: ${err.message}`
  biostable.querySelector('.biosfeatures').innerText = `Error: ${err.message}`
})

//OS tab
const ostable = document.getElementById('ostable')
const osmain = document.getElementById('osmain')
osmain.innerText = 'Loading...'

window.system.os().then(info => {
  osmain.innerText = `${info.distro} ${info.release} ${info.codename}`
  ostable.querySelector('.osplatform').innerText = `${info.platform}`
  ostable.querySelector('.osdistribution').innerText = `${info.distro}`
  ostable.querySelector('.osrelease').innerText = `${info.release}`
  ostable.querySelector('.osbuild').innerText = `${info.build}`
  ostable.querySelector('.oskernel').innerText = `${info.kernel}`
  ostable.querySelector('.osarch').innerText = `${info.arch}`
  ostable.querySelector('.osserial').innerText = `${info.serial}`
  ostable.querySelector('.oshostname').innerText = `${info.hostname}`
  ostable.querySelector('.osfqdn').innerText = `${info.fqdn}`
  ostable.querySelector('.osuefi').innerText = `${info.uefi}` // true or false
}).catch(err => {
  osmain.innerText = `Error: ${err.message}`
  ostable.querySelector('.osplatform').innerText = `Error: ${err.message}`
  ostable.querySelector('.osdistribution').innerText = `Error: ${err.message}`
  ostable.querySelector('.osrelease').innerText = `Error: ${err.message}`
  ostable.querySelector('.osbuild').innerText = `Error: ${err.message}`
  ostable.querySelector('.oskernel').innerText = `Error: ${err.message}`
  ostable.querySelector('.osarch').innerText = `Error: ${err.message}`
  ostable.querySelector('.osserial').innerText = `Error: ${err.message}`
  ostable.querySelector('.oshostname').innerText = `Error: ${err.message}`
  ostable.querySelector('.osfqdn').innerText = `Error: ${err.message}`
  ostable.querySelector('.osuefi').innerText = `Error: ${err.message}`
})