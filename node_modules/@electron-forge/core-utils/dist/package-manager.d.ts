import { CrossSpawnArgs, CrossSpawnOptions } from '@malept/cross-spawn-promise';
export type SupportedPackageManager = 'yarn' | 'npm' | 'pnpm';
export type PMDetails = {
    executable: SupportedPackageManager;
    version?: string;
    install: string;
    dev: string;
    exact: string;
};
/**
 * Supported package managers and the commands and flags they need to install dependencies.
 */
export declare const PACKAGE_MANAGERS: Record<SupportedPackageManager, PMDetails>;
/**
 * Resolves the package manager to use. In order, it checks the following:
 *
 * 1. The value of the `NODE_INSTALLER` environment variable.
 * 2. The `process.env.npm_config_user_agent` value set by the executing package manager.
 * 3. The presence of a lockfile in an ancestor directory.
 * 4. If an unknown package manager is used (or none of the above apply), then we fall back to `npm`.
 *
 * The version of the executing package manager is also returned if it is detected via user agent.
 *
 * Supported package managers are `yarn`, `pnpm`, and `npm`.
 *
 */
export declare const resolvePackageManager: () => Promise<PMDetails>;
export declare const spawnPackageManager: (pm: PMDetails, args?: CrossSpawnArgs, opts?: CrossSpawnOptions) => Promise<string>;
//# sourceMappingURL=package-manager.d.ts.map