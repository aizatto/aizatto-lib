/**
 * All of this is really bad code
 */
interface Results {
    links: string;
    scripts: string;
}
interface Assets {
    links: string[];
    scripts: string[];
}
export declare function scrapeHTML(html: string): Assets;
/**
 * We don't use an `if` condition so tha we can test this function in isolation
 */
export declare function scrapeProduction(html: string): Assets;
export declare function fetchAssets(devServer: string, buildFile: string): Promise<Results>;
export {};
//# sourceMappingURL=assets.d.ts.map