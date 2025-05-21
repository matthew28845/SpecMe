export declare function importSearchRaw<T>(relativeTo: string, paths: string[]): Promise<T | null>;
export type PossibleModule<T> = {
    default?: T;
} & T;
declare const _default: <T>(relativeTo: string, paths: string[]) => Promise<T | null>;
export default _default;
//# sourceMappingURL=import-search.d.ts.map