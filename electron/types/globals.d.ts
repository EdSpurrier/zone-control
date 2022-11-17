/**
 * IMPORTANT - do not use imports in this file!
 * It will break global definition.
 */
 declare namespace NodeJS {
    export interface Global {
        titanCore: any;
    }
}

declare var titanCore: any;