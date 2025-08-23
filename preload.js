const { contextBridge, ipcRenderer } = require('electron/renderer')
const si = require("systeminformation");

contextBridge.exposeInMainWorld('system', {
  system: () => si.system(),
  os: () => si.osInfo(),
  uuid: () => si.uuid(),
  bios: () => si.bios(),
  baseboard: () => si.baseboard(),
  chassis: () => si.chassis(),
  time: () => si.time()
})
contextBridge.exposeInMainWorld('specs', {
  cpu: () => si.cpu(),
  mem: () => si.mem(),
  memlayout: () => si.memLayout(),
  disk: () => si.diskLayout(),
  gpu: () => si.graphics(),
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})