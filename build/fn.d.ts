export declare function setMath<T>(a: Set<T>, b: Set<T>): {
    remove: T[];
    add: T[];
};
export declare function setEqual<T>(a: Set<T>, b: Set<T>): boolean;
export declare function isValidDateString(date: string): string;
/**
 * Scenarios:
 * * urlA has hostname, urlB does not have hostname
 *
 * TODO: replace this logic, it is really basic
 */
export declare function compareURL(stringA: string, stringB: string): Boolean;
export declare function conjunction(sentences: string[]): string;
//# sourceMappingURL=fn.d.ts.map