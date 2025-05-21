import { ForgeTemplate } from '@electron-forge/shared-types';
declare enum TemplateType {
    global = "global",
    local = "local"
}
export interface ForgeTemplateDetails {
    name: string;
    path: string;
    template: ForgeTemplate;
    type: TemplateType;
}
export declare const findTemplate: (template: string) => Promise<ForgeTemplateDetails>;
export {};
//# sourceMappingURL=find-template.d.ts.map