"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const BASE_OUT_DIR = 'out';
exports.default = (baseDir, forgeConfig) => {
    const baseOutDir = forgeConfig.outDir || BASE_OUT_DIR;
    if (forgeConfig.buildIdentifier) {
        let identifier = forgeConfig.buildIdentifier;
        if (typeof identifier === 'function') {
            identifier = identifier();
        }
        if (identifier)
            return node_path_1.default.resolve(baseDir, baseOutDir, identifier);
    }
    return node_path_1.default.resolve(baseDir, baseOutDir);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0LWRpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL291dC1kaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBNkI7QUFJN0IsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBRTNCLGtCQUFlLENBQUMsT0FBZSxFQUFFLFdBQWdDLEVBQVUsRUFBRTtJQUMzRSxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQztJQUV0RCxJQUFJLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNoQyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDO1FBQzdDLElBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDckMsVUFBVSxHQUFHLFVBQVUsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFDRCxJQUFJLFVBQVU7WUFBRSxPQUFPLG1CQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELE9BQU8sbUJBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyJ9