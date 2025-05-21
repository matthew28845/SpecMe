import { ForgeListrTask } from '@electron-forge/shared-types';
export declare function checkPackageManager(): Promise<string>;
export type SystemCheckContext = {
    command: string;
    git: boolean;
    node: boolean;
    packageManager: boolean;
};
export declare function checkSystem(callerTask: ForgeListrTask<SystemCheckContext>): Promise<true | import("listr2").Listr<SystemCheckContext, any, any>>;
//# sourceMappingURL=check-system.d.ts.map