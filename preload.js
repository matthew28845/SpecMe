const { contextBridge, ipcRenderer } = require('electron/renderer')
const si = require("systeminformation");

contextBridge.exposeInMainWorld('system', {
  system: () => si.system(),
  os: () => si.osInfo(),
})
contextBridge.exposeInMainWorld('specs', {
  cpu: () => si.cpu(),
  ram: () => si.memLayout(),
  disk: () => si.diskLayout(),
  gpu: () => si.graphics(),
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})