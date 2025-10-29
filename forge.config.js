const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'images/logo' // no file extension required
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux', 'win'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: 'images/logo.png',
          categories: ['Utility'],
          id: 'com.matthew28845.specme'
        }
      },
    },
    {
      name: '@electron-forge/maker-flatpak',
      config: {
        options: {
          icon: 'images/logo.png',
          categories: ['Utility'],
          id: 'com.matthew28845.specme'
        }
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          icon: 'images/logo.png',
          categories: ['Utility'],
          id: 'com.matthew28845.specme',
          bin: 'SpecMe',
          name: 'SpecMe',
          productName: 'SpecMe',
          genericName: 'System Specification Viewer',
          description: 'A cross-platform system specification viewer built with Electron',
          homepage: 'https://matthewsigmond.com/posts/software/specme/',
          license: 'ISC',
          requires: [],
          group: 'Applications/System',
          compressionLevel: 9,
          epoch: 0,
          release: '1'
        }
      }
    },
    {
      name: '@electron-forge/maker-wix',
      config: {
        options: {
          icon: 'images/logo.ico',
          ui: {
            chooseDirectory: true,
          },
        }
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
