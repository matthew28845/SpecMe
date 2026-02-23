//Fills in all of the information in the HTML file, after systeminformation is called with preload.js

// Get all DOM elements upfront
const cputable = document.getElementById('cputable')
const cpumain = document.getElementById('cpumain')
const cputempelement = document.getElementById('cputempelement')
const memtable = document.getElementById('memtable')
const memmain = document.getElementById('memmain')
const disktable = document.getElementById('disktable')
const diskmain = document.getElementById('diskmain')
const gputable = document.getElementById('gputable')
const gpumain = document.getElementById('gpumain')
const systemtable = document.getElementById('systemtable')
const boardtable = document.getElementById('boardtable')
const biostable = document.getElementById('biostable')
const ostable = document.getElementById('ostable')
const osmain = document.getElementById('osmain')
const manufacturer = document.getElementById('mfgmain')
const model = document.getElementById('modelmain')
const version = document.getElementById('versionmain')
const mfglogo = document.getElementById('mfglogo')

cpumain.innerText = 'Loading...'
memmain.innerText = 'Loading...'
diskmain.innerText = 'Loading...'
gpumain.innerText = 'Loading...'
osmain.innerText = 'Loading...'
manufacturer.innerText = 'Loading...'
model.innerText = 'Loading...'
version.innerText = 'Loading...'

let cputext = ''
let tempIntervalId = null

// Progressive loading strategy for better performance on Windows:
// Phase 1: Fast calls (CPU, Memory, OS, System) - show immediately
// Phase 2: Medium calls (Memory Layout, Battery) - load after Phase 1
// Phase 3: Slow calls (Disk, GPU, Baseboard, BIOS) - load after Phase 2

// Phase 1: Load fast data first
Promise.all([
  window.specs.cpu(),
  window.specs.mem(),
  window.system.os(),
  window.system.system()
]).then(([cpuInfo, memInfo, osInfo, systemInfo]) => {
  // CPU tab
  try {
    //fix display issue for newer Intel CPUs
    brandstring = cpuInfo.brand.replace(/^Gen Intel® /, '')
    cpumain.innerText = `${cpuInfo.manufacturer} ${brandstring} (${cpuInfo.cores} threads)`
    cputext = cpumain.innerText
    cputable.querySelector('.cpumanufacturer').innerText = `${cpuInfo.manufacturer}`
    cputable.querySelector('.cpumodel').innerText = `${cpuInfo.brand}`
    cputable.querySelector('.cpusocket').innerText = `${cpuInfo.socket}`
    cputable.querySelector('.cpuclock').innerText = `${cpuInfo.speed} base, up to ${cpuInfo.speedMax} GHz`
    cputable.querySelector('.cpucores').innerText = `${cpuInfo.processors} processor(s), ${cpuInfo.physicalCores} cores, ${cpuInfo.performanceCores} performance, ${cpuInfo.efficiencyCores} efficiency`
    if (cpuInfo.cache) {
      if (cpuInfo.cache.l1i && cpuInfo.cache.l1d) {
        cputable.querySelector('.cpucache1').innerText = `${cpuInfo.cache.l1i/1024} KB instruction, ${cpuInfo.cache.l1d/1024} KB data`
      }
      if (cpuInfo.cache.l2) {
        cputable.querySelector('.cpucache2').innerText = `${cpuInfo.cache.l2/1024} KB`
      }
      if (cpuInfo.cache.l3) {
        cputable.querySelector('.cpucache3').innerText = `${cpuInfo.cache.l3/1024} KB`
      }
    }
    cputable.querySelector('.cpuflags').innerText = `${cpuInfo.flags}`
  } catch (err) {
    cpumain.innerText = `Error: ${err.message}`
  }

  // Memory tab (basic info)
  try {
    if (memInfo && memInfo.total) {
      if (memInfo.total > 1048576) {
        memmain.innerText = ` ${(memInfo.total/1073741824).toFixed(1)} GB`
      } else {
        memmain.innerText = ` ${Math.floor(memInfo.total/1048576)} MB`
      }
    }
  } catch (err) {
    console.log('Memory error:', err)
    memmain.innerText = `Error: ${err.message}`
  }

  // OS tab
  try {
    osmain.innerText = `${osInfo.distro} ${osInfo.release} ${osInfo.codename}`
    ostable.querySelector('.osplatform').innerText = `${osInfo.platform}`
    ostable.querySelector('.osdistribution').innerText = `${osInfo.distro}`
    ostable.querySelector('.osrelease').innerText = `${osInfo.release}`
    ostable.querySelector('.osbuild').innerText = `${osInfo.build}`
    ostable.querySelector('.oskernel').innerText = `${osInfo.kernel}`
    ostable.querySelector('.osarch').innerText = `${osInfo.arch}`
    ostable.querySelector('.osserial').innerText = `${osInfo.serial}`
    ostable.querySelector('.oshostname').innerText = `${osInfo.hostname}`
    ostable.querySelector('.osfqdn').innerText = `${osInfo.fqdn}`
    ostable.querySelector('.osuefi').innerText = `${osInfo.uefi ? "Yes" : "No"}`
  } catch (err) {
    osmain.innerText = `Error: ${err.message}`
  }

  // System tab
  try {
    manufacturer.innerText = `${systemInfo.manufacturer} `
    model.innerText = `${systemInfo.model}`
    version.innerText = `${systemInfo.version}`
    systemtable.querySelector('.systemmfg').innerText = `${systemInfo.manufacturer}`
    systemtable.querySelector('.systemmodel').innerText = `${systemInfo.model}`
    systemtable.querySelector('.systemname').innerText = `${systemInfo.version}`
    systemtable.querySelector('.systemserial').innerText = `${systemInfo.serial}`
    systemtable.querySelector('.systemuuid').innerText = `${systemInfo.uuid}`
    systemtable.querySelector('.systemvm').innerText = `${systemInfo.virtual ? "Yes" : "No"}`
    systemtable.querySelector('.systemformfactor').innerText = `${systemInfo.type}`
  } catch (err) {
    manufacturer.innerText = `Error: ${err.message}`
  }

  // Start temperature monitoring
  refreshTemps()
  if (tempIntervalId !== null) {
    clearInterval(tempIntervalId)
  }
  tempIntervalId = setInterval(refreshTemps, 5000)

  // Phase 2: Load medium-speed data
  Promise.all([
    window.specs.memlayout(),
    window.specs.battery()
  ]).then(([memLayoutInfo, batteryInfo]) => {
    // Memory Layout (detailed)
    try {
      let memiterator = 1
      if (memLayoutInfo && memLayoutInfo[0]) {
        memmain.innerText += ` ${memLayoutInfo[0].type || ''}`
        memtable.querySelector('.memsize').innerText = `${Math.floor(memLayoutInfo[0].size/1048576)} MB`
        memtable.querySelector('.memtype').innerText = `${memLayoutInfo[0].type}`
        memtable.querySelector('.memclock').innerText = `${memLayoutInfo[0].clockSpeed} MHz`
        memtable.querySelector('.memmfg').innerText = `${memLayoutInfo[0].manufacturer}`
        memtable.querySelector('.memformfactor').innerText = `${memLayoutInfo[0].formFactor}`
        memtable.querySelector('.mempart').innerText = `${memLayoutInfo[0].partNumber}`
        memtable.querySelector('.memserial').innerText = `${memLayoutInfo[0].serialNumber}`
        memtable.querySelector('.memvmin').innerText = `${memLayoutInfo[0].voltageMin} V`
        memtable.querySelector('.memvmax').innerText = `${memLayoutInfo[0].voltageMax} V`
        while (memLayoutInfo[memiterator] !== undefined) {
          const clone = memtable.cloneNode(true)
          clone.id = 'memtable ' + memiterator
          const memnumber = document.createElement('h3')
          document.getElementById('memend').appendChild(memnumber)
          memnumber.innerText = `Bank ${memiterator}`
          document.getElementById('memend').appendChild(clone)
          clone.querySelector('.memsize').innerText = `${Math.floor(memLayoutInfo[memiterator].size/1048576)} MB`
          clone.querySelector('.memtype').innerText = `${memLayoutInfo[memiterator].type}`
          clone.querySelector('.memclock').innerText = `${memLayoutInfo[memiterator].clockSpeed} MHz`
          clone.querySelector('.memmfg').innerText = `${memLayoutInfo[memiterator].manufacturer}`
          clone.querySelector('.memformfactor').innerText = `${memLayoutInfo[memiterator].formFactor}`
          clone.querySelector('.mempart').innerText = `${memLayoutInfo[memiterator].partNumber}`
          clone.querySelector('.memserial').innerText = `${memLayoutInfo[memiterator].serialNumber}`
          clone.querySelector('.memvmin').innerText = `${memLayoutInfo[memiterator].voltageMin} V`
          clone.querySelector('.memvmax').innerText = `${memLayoutInfo[memiterator].voltageMax} V`
          memiterator++
        }
      }
    } catch (err) {
      console.log('Memory layout error:', err)
    }

    // Battery tab
    try {
      if (batteryInfo && batteryInfo.hasBattery === false) {
        document.getElementById('batterytabbtn').style.display = 'none'
      } else if (batteryInfo) {
        const batterytable = document.getElementById('batterytable')
        batterytable.querySelector('.battac').innerText = `${batteryInfo.acConnected ? "Yes" : "No"}`
        batterytable.querySelector('.battcharging').innerText = `${batteryInfo.isCharging ? "Yes" : "No"}`
        batterytable.querySelector('.battpercent').innerText = `${batteryInfo.percent}%`
        if (batteryInfo.timeRemaining%60 < 10) {
          batterytable.querySelector('.battremaining').innerText = `${Math.floor(batteryInfo.timeRemaining/60)}:0${batteryInfo.timeRemaining%60}`
        } else {
          batterytable.querySelector('.battremaining').innerText = `${Math.floor(batteryInfo.timeRemaining/60)}:${batteryInfo.timeRemaining%60}`
        }
        batterytable.querySelector('.battvoltage').innerText = `${batteryInfo.voltage} V`
        batterytable.querySelector('.battcycles').innerText = `${batteryInfo.cycleCount}`
        batterytable.querySelector('.battdesigncap').innerText = `${batteryInfo.designedCapacity} ${batteryInfo.capacityUnit}`
        batterytable.querySelector('.battcurrentcap').innerText = `${batteryInfo.currentCapacity} ${batteryInfo.capacityUnit}`
        batterytable.querySelector('.battmaxcap').innerText = `${batteryInfo.maxCapacity} ${batteryInfo.capacityUnit}`
        if (batteryInfo.designedCapacity && batteryInfo.designedCapacity > 0) {
          batterytable.querySelector('.batthealth').innerText = `${Math.floor((batteryInfo.maxCapacity/batteryInfo.designedCapacity)*100)}%`
        } else {
          batterytable.querySelector('.batthealth').innerText = 'N/A'
        }
        batterytable.querySelector('.batttype').innerText = `${batteryInfo.type}`
        batterytable.querySelector('.battmodel').innerText = `${batteryInfo.model}`
        batterytable.querySelector('.battmfg').innerText = `${batteryInfo.manufacturer}`
        batterytable.querySelector('.battserial').innerText = `${batteryInfo.serial}`
      }
    } catch (err) {
      console.error('Battery info error:', err)
    }
  }).catch(err => {
    console.error('Error loading phase 2 data:', err)
  })

  // Phase 3: Load slow data (these are the slowest on Windows)
  Promise.all([
    window.specs.disk(),
    window.specs.gpu(),
    window.system.baseboard(),
    window.system.bios()
  ]).then(([diskInfo, gpuInfo, baseboardInfo, biosInfo]) => {
    // Disk tab
  try {
    let diskiterator = 1
    if (diskInfo && diskInfo[0]) {
      diskmain.innerText = `${diskInfo[0].name || 'Unknown'} (${diskInfo[0].size ? Math.floor(diskInfo[0].size/1073741824) : 'N/A'} GB)`
      disktable.querySelector('.diskvendor').innerText = `${diskInfo[0].vendor}`
      disktable.querySelector('.diskmodel').innerText = `${diskInfo[0].name}`
      disktable.querySelector('.disksize').innerText = `${Math.floor(diskInfo[0].size/1073741824)} GB`
      disktable.querySelector('.disktype').innerText = `${diskInfo[0].type}`
      disktable.querySelector('.diskinterface').innerText = `${diskInfo[0].interfaceType}`
      disktable.querySelector('.diskserial').innerText = `${diskInfo[0].serialNum}`
      disktable.querySelector('.disksmart').innerText = `${diskInfo[0].smartStatus}`
      disktable.querySelector('.disktemp').innerText = `${diskInfo[0].temperature} °C`
      disktable.querySelector('.disksectors').innerText = `${diskInfo[0].sectors}`
      disktable.querySelector('.diskcht').innerText = `${diskInfo[0].channelType}`
      disktable.querySelector('.diskfirmware').innerText = `${diskInfo[0].firmwareRevision}`
      while (diskInfo[diskiterator] !== undefined) {
        const clone = disktable.cloneNode(true)
        clone.id = 'disktable ' + diskiterator
        const disknumber = document.createElement('h3')
        document.getElementById('diskend').appendChild(disknumber)
        disknumber.innerText = `Disk ${diskiterator}`
        document.getElementById('diskend').appendChild(clone)
        clone.querySelector('.diskvendor').innerText = `${diskInfo[diskiterator].vendor}`
        clone.querySelector('.diskmodel').innerText = `${diskInfo[diskiterator].name}`
        clone.querySelector('.disksize').innerText = `${Math.floor(diskInfo[diskiterator].size/1073741824)} GB`
        clone.querySelector('.disktype').innerText = `${diskInfo[diskiterator].type}`
        clone.querySelector('.diskinterface').innerText = `${diskInfo[diskiterator].interfaceType}`
        clone.querySelector('.diskserial').innerText = `${diskInfo[diskiterator].serialNum}`
        clone.querySelector('.disksmart').innerText = `${diskInfo[diskiterator].smartStatus}`
        clone.querySelector('.disktemp').innerText = `${diskInfo[diskiterator].temperature} °C`
        clone.querySelector('.disksectors').innerText = `${diskInfo[diskiterator].sectors}`
        clone.querySelector('.diskcht').innerText = `${diskInfo[diskiterator].channelType}`
        clone.querySelector('.diskfirmware').innerText = `${diskInfo[diskiterator].firmwareRevision}`
        diskmain.innerText += `
    ${diskInfo[diskiterator].name} (${Math.floor(diskInfo[diskiterator].size/1073741824)} GB)`
        diskiterator++
      }
    } else {
      diskmain.innerText = 'No disk information available'
    }
  } catch (err) {
    diskmain.innerText = `Error: ${err.message}`
  }

  // GPU tab
  try {
    let gpuiterator = 1
    if (gpuInfo && gpuInfo.controllers && gpuInfo.controllers[0]) {
      //make it so that main page doesn't display "NVIDIA NVIDIA" or "AMD AMD"
      vendorstring = gpuInfo.controllers[0].vendor
      if (!(vendorstring.includes('Intel'))){
        vendorstring = ''
      }
      if (gpuInfo.controllers[0].vramDynamic === true) {
        if(gpuInfo.controllers[0].vram === null){
          gpumain.innerText = `${vendorstring} ${gpuInfo.controllers[0].model} (Dynamic VRAM)`
        } else {
          gpumain.innerText = `${vendorstring} ${gpuInfo.controllers[0].model} (${gpuInfo.controllers[0].vram} MB, Dynamic VRAM)`
        }
      }
      else if(gpuInfo.controllers[0].vram !== null){
        gpumain.innerText = `${vendorstring} ${gpuInfo.controllers[0].model} (${gpuInfo.controllers[0].vram} MB)`
      } else {
        gpumain.innerText = `${vendorstring} ${gpuInfo.controllers[0].model}`
      }
      gputable.querySelector('.gpuvendor').innerText = `${gpuInfo.controllers[0].vendor}`
      gputable.querySelector('.gpumodel').innerText = `${gpuInfo.controllers[0].model}`
      if (gpuInfo.controllers[0].vram !== null) {
        gputable.querySelector('.gpuvram').innerText = `${gpuInfo.controllers[0].vram} MB`
        if (gpuInfo.controllers[0].vramDynamic === true) {
          gputable.querySelector('.gpuvram').innerText += ` (Dynamic VRAM)`
        }
      } else {
        gputable.querySelector('.gpuvram').innerText = gpuInfo.controllers[0].vramDynamic === true ? 'Dynamic VRAM' : 'N/A'
      }
      gputable.querySelector('.gpucores').innerText = `${gpuInfo.controllers[0].gpuCores} cores`
      gputable.querySelector('.gpubus').innerText = `${gpuInfo.controllers[0].bus}`
      while (gpuInfo.controllers[gpuiterator] !== undefined) {
        const clone = gputable.cloneNode(true)
        clone.id = 'gputable ' + gpuiterator
        const gpunumber = document.createElement('h3')
        document.getElementById('gpuend').appendChild(gpunumber)
        gpunumber.innerText = `GPU ${gpuiterator}`
        document.getElementById('gpuend').appendChild(clone)
        clone.querySelector('.gpuvendor').innerText = `${gpuInfo.controllers[gpuiterator].vendor}`
        clone.querySelector('.gpumodel').innerText = `${gpuInfo.controllers[gpuiterator].model}`
        clone.querySelector('.gpuvram').innerText = `${gpuInfo.controllers[gpuiterator].vram} MB`
        if (gpuInfo.controllers[gpuiterator].vramDynamic === true) {
          clone.querySelector('.gpuvram').innerText += ` (Dynamic VRAM)`
        }
        clone.querySelector('.gpucores').innerText = `${gpuInfo.controllers[gpuiterator].gpuCores} cores`
        clone.querySelector('.gpubus').innerText = `${gpuInfo.controllers[gpuiterator].bus}`
        if (gpuInfo.controllers[gpuiterator].vramDynamic === true) {
          gpumain.innerText += `
    ${gpuInfo.controllers[gpuiterator].vendor} ${gpuInfo.controllers[gpuiterator].model} (${gpuInfo.controllers[gpuiterator].vram} MB, Dynamic VRAM)`
        } else {
        gpumain.innerText += `
    ${gpuInfo.controllers[gpuiterator].vendor} ${gpuInfo.controllers[gpuiterator].model} (${gpuInfo.controllers[gpuiterator].vram} MB)`
        }
        gpuiterator++
      }
    } else {
      gpumain.innerText = 'No GPU information available'
    }

    // Displays tab
    const displaymain = document.getElementById('displaymain')
    if (gpuInfo.displays && gpuInfo.displays[0]) {
      if (gpuInfo.displays[0].resolutionX  !== null) {
        displaymain.innerText = `${gpuInfo.displays[0].model} ${gpuInfo.displays[0].resolutionX}x${gpuInfo.displays[0].resolutionY} @ ${gpuInfo.displays[0].currentRefreshRate} Hz`
      } else {
        displaymain.innerText = `${gpuInfo.displays[0].model} ${gpuInfo.displays[0].currentResX}x${gpuInfo.displays[0].currentResY} @ ${gpuInfo.displays[0].currentRefreshRate} Hz`
      }
      const disptable = document.getElementById('displaytable')
      disptable.querySelector('.displaymodel').innerText = `${gpuInfo.displays[0].model}`
      disptable.querySelector('.displayresmax').innerText = `${gpuInfo.displays[0].resolutionX}x${gpuInfo.displays[0].resolutionY}`
      disptable.querySelector('.displayres').innerText = `${gpuInfo.displays[0].currentResX}x${gpuInfo.displays[0].currentResY}`
      disptable.querySelector('.displayfps').innerText = `${gpuInfo.displays[0].currentRefreshRate} Hz`
      disptable.querySelector('.displaydepth').innerText = `${gpuInfo.displays[0].pixelDepth} bit`
      disptable.querySelector('.displayconn').innerText = `${gpuInfo.displays[0].connection}`
      disptable.querySelector('.displaymain').innerText = `${gpuInfo.displays[0].main ? "Yes" : "No"}`
      disptable.querySelector('.displaybuiltin').innerText = `${gpuInfo.displays[0].builtin ? "Yes" : "No"}`
      let displayiterator = 1
      while (gpuInfo.displays[displayiterator] !== undefined) {
        const clone = disptable.cloneNode(true)
        clone.id = 'displaytable ' + displayiterator
        const displaynumber = document.createElement('h3')
        document.getElementById('displayend').appendChild(displaynumber)
        displaynumber.innerText = `Display ${displayiterator}`
        document.getElementById('displayend').appendChild(clone)
        clone.querySelector('.displaymodel').innerText = `${gpuInfo.displays[displayiterator].model}`
        clone.querySelector('.displayresmax').innerText = `${gpuInfo.displays[displayiterator].maxResX}x${gpuInfo.displays[displayiterator].maxResY}`
        clone.querySelector('.displayres').innerText = `${gpuInfo.displays[displayiterator].currentResX}x${gpuInfo.displays[displayiterator].currentResY}`
        clone.querySelector('.displayfps').innerText = `${gpuInfo.displays[displayiterator].currentRefreshRate} Hz`
        clone.querySelector('.displaydepth').innerText = `${gpuInfo.displays[displayiterator].pixelDepth} bit`
        clone.querySelector('.displayconn').innerText = `${gpuInfo.displays[displayiterator].connection}`
        clone.querySelector('.displaymain').innerText = `${gpuInfo.displays[displayiterator].main ? "Yes" : "No"}`
        clone.querySelector('.displaybuiltin').innerText = `${gpuInfo.displays[displayiterator].builtin ? "Yes" : "No"}`
        displaymain.innerText += `
    ${gpuInfo.displays[displayiterator].model} ${gpuInfo.displays[displayiterator].currentResX}x${gpuInfo.displays[displayiterator].currentResY} @ ${gpuInfo.displays[displayiterator].currentRefreshRate} Hz`
        displayiterator++
      }
    } else {
      displaymain.innerText = 'No display information available'
    }
  } catch (err) {
    gpumain.innerText = `Error: ${err.message}`
  }

    // Baseboard tab
    try {
      boardtable.querySelector('.boardmfg').innerText = `${baseboardInfo.manufacturer}`
      boardtable.querySelector('.boardmodel').innerText = `${baseboardInfo.model}`
      boardtable.querySelector('.boardserial').innerText = `${baseboardInfo.serial}`
      boardtable.querySelector('.boardasset').innerText = `${baseboardInfo.assetTag}`
      boardtable.querySelector('.boardmemslots').innerText = `${baseboardInfo.memSlots}`
      boardtable.querySelector('.boardmaxmem').innerText = `${Math.floor(baseboardInfo.memMax/1073741824)} GB`
    } catch (err) {
      console.error('Baseboard error:', err)
    }

    // BIOS tab
    try {
      biostable.querySelector('.biosvendor').innerText = `${biosInfo.vendor}`
      biostable.querySelector('.biosversion').innerText = `${biosInfo.version}`
      biostable.querySelector('.biosdate').innerText = `${biosInfo.releaseDate}`
      biostable.querySelector('.biosrev').innerText = `${biosInfo.revision}`
      biostable.querySelector('.biosserial').innerText = `${biosInfo.serial}`
      biostable.querySelector('.bioslanguage').innerText = `${biosInfo.language}`
      biostable.querySelector('.biosfeatures').innerText = `${biosInfo.features}`
    } catch (err) {
      console.error('BIOS error:', err)
    }

    // Clean up empty rows after all data is loaded
    deleteRows()
  }).catch(err => {
    console.error('Error loading phase 3 data:', err)
  })
}).catch(err => {
  console.error('Error loading phase 1 data:', err)
  cpumain.innerText = `Error: ${err.message}`
})

//Refreshes CPU temp and updates the field
function refreshTemps() {
  window.specs.cputemp().then(info => {
    if (info && info.main !== null && info.main !== undefined) {
      cputempelement.innerText = ` ${info.main} °C`
      //color
      if (info.main > 85) {
        cputempelement.style.color = 'red'
      } else if (info.main > 70) {
        cputempelement.style.color = 'orange'
      } else {
        cputempelement.style.color = 'green'
      }
    }
  }).catch(err => {
    cpumain.innerText = cputext + ` (Error: ${err.message})`
  })
}

//Deletes rows where systeminformation can't find a value
function deleteRows() {
  document.querySelectorAll('td').forEach(cell => {
    if (cell.innerText === '' || cell.innerText.includes('undefined' ) || cell.innerText.includes('null') || cell.innerText.includes('unknown')) {
      const row = cell.parentNode
      if (row && row.parentNode) {
        row.parentNode.removeChild(row)
      }
    }
  })
}
