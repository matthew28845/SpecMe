const { contextBridge } = require('electron/renderer')
const si = require("systeminformation");

contextBridge.exposeInMainWorld('specs', {
  cpu: () => si.cpu(),
  ram: () => si.mem(),
})