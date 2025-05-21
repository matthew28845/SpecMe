const { contextBridge } = require('electron/renderer')
const si = require("systeminformation");

contextBridge.exposeInMainWorld('system', {
  system: () => si.system(),
  os: () => si.osInfo(),
})
contextBridge.exposeInMainWorld('specs', {
  cpu: () => si.cpu(),
  ram: () => si.mem(),
})