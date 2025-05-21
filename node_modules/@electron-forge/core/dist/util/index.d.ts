import { getElectronVersion } from '@electron-forge/core-utils';
import { BuildIdentifierConfig, BuildIdentifierMap } from './forge-config';
import type { ForgeConfig } from '@electron-forge/shared-types';
export default class ForgeUtils {
    /**
     * Helper for creating a dynamic config value that will get its real value
     * based on the "buildIdentifier" in your Forge config.
     *
     * Usage:
     * `fromBuildIdentifier({ stable: 'App', beta: 'App Beta' })`
     */
    fromBuildIdentifier<T>(map: BuildIdentifierMap<T>): BuildIdentifierConfig<T>;
    getElectronVersion: typeof getElectronVersion;
    spawnPackageManager: (pm: import("@electron-forge/core-utils").PMDetails, args?: import("@malept/cross-spawn-promise").CrossSpawnArgs, opts?: import("@malept/cross-spawn-promise").CrossSpawnOptions | undefined) => Promise<string>;
    /**
     * Register a virtual config file for forge to find.
     * Takes precedence over other configuration options like a forge.config.js file.
     * Dir should point to the folder containing the app.
     */
    registerForgeConfigForDirectory(dir: string, config: ForgeConfig): void;
    /**
     * Unregister a forge config previously registered with registerForgeConfigForDirectory.
     */
    unregisterForgeConfigForDirectory(dir: string): void;
}
//# sourceMappingURL=index.d.ts.map