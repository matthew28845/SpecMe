"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isInstalled(pkg) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require(pkg);
        return true;
    }
    catch {
        // Package doesn't exist -- must not be installable on this platform
        return false;
    }
}
exports.default = isInstalled;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaW5zdGFsbGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvaXMtaW5zdGFsbGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBd0IsV0FBVyxDQUFDLEdBQVc7SUFDN0MsSUFBSSxDQUFDO1FBQ0gsaUVBQWlFO1FBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLG9FQUFvRTtRQUNwRSxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDO0FBVEQsOEJBU0MifQ==