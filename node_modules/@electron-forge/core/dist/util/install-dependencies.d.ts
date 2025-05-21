import { PMDetails } from '@electron-forge/core-utils';
export declare enum DepType {
    PROD = "PROD",
    DEV = "DEV"
}
export declare enum DepVersionRestriction {
    EXACT = "EXACT",
    RANGE = "RANGE"
}
declare const _default: (pm: PMDetails, dir: string, deps: string[], depType?: DepType, versionRestriction?: DepVersionRestriction) => Promise<void>;
export default _default;
//# sourceMappingURL=install-dependencies.d.ts.map