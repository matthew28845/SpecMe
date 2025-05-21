export interface InitOptions {
    /**
     * The path to the app to be initialized
     */
    dir?: string;
    /**
     * Whether to use sensible defaults or prompt the user visually
     */
    interactive?: boolean;
    /**
     * Whether to copy template CI files
     */
    copyCIFiles?: boolean;
    /**
     * Whether to overwrite an existing directory
     */
    force?: boolean;
    /**
     * The custom template to use. If left empty, the default template is used
     */
    template?: string;
    /**
     * By default, Forge initializes a git repository in the project directory. Set this option to `true` to skip this step.
     */
    skipGit?: boolean;
}
declare const _default: ({ dir, interactive, copyCIFiles, force, template, skipGit, }: InitOptions) => Promise<void>;
export default _default;
//# sourceMappingURL=init.d.ts.map