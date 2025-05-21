import { FuseConfig } from '@electron/fuses';
import { PluginBase } from '@electron-forge/plugin-base';
import { ForgeMultiHookMap } from '@electron-forge/shared-types';
export default class FusesPlugin extends PluginBase<FuseConfig> {
    name: string;
    fusesConfig: FuseConfig;
    constructor(fusesConfig: FuseConfig);
    getHooks(): ForgeMultiHookMap;
}
export { FusesPlugin };
//# sourceMappingURL=FusesPlugin.d.ts.map