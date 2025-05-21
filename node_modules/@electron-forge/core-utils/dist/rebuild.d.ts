import { RebuildOptions } from '@electron/rebuild';
import { ForgeArch, ForgeListrTask, ForgePlatform } from '@electron-forge/shared-types';
export declare const listrCompatibleRebuildHook: <Ctx = never>(buildPath: string, electronVersion: string, platform: ForgePlatform, arch: ForgeArch, config: Partial<RebuildOptions> | undefined, task: ForgeListrTask<Ctx>, taskTitlePrefix?: string) => Promise<void>;
//# sourceMappingURL=rebuild.d.ts.map