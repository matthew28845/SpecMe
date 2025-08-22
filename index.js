const { app, BrowserWindow, ipcMain, nativeTheme, Menu } = require('electron/main')
const path = require('node:path')

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
              ]
            }
          ]
        : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ]
        : [
            { role: 'close' }
          ])
    ]
  },
    {
    label: 'Theme',
    submenu: [
      { label: 'System', 
        click: async () => {
            nativeTheme.themeSource = 'system'
        }
      },
      { label: 'Dark' ,
          click: async () => {
            nativeTheme.themeSource = 'dark'
        }
      },
      { label: 'Light' ,
          click: async () => {
            nativeTheme.themeSource = 'light'
        }
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'About SpecMe',
        click: async () => {
          const { dialog } = require('electron')
          const win = BrowserWindow.getFocusedWindow()
          if (win) {
            await dialog.showMessageBox(win, {
              type: 'info',
              title: 'About SpecMe',
              message: 'SpecMe is a free and open-source system specification viewer written in Electron.\nVersion: 1.3\nCreated by Matthew Sigmond 2025.',
              buttons: ['OK']
            })
          }
        }
      },
      {
        label: 'SpecMe Website',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://matthewsigmond.com/posts/software/specme/')
        }
      }
    ]
  },
  {
    label: 'Refresh Info',
    click: async () => {
      const win = BrowserWindow.getFocusedWindow()
      if (win) {
        win.reload()
      }
    }
  }
]

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 650,
    icon: path.join(__dirname, 'images/logo.png'),
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false
    }
  })

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  win.loadFile('index.html')
  win.set
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}
)