declare namespace Deno {
    export function emit (rootSpecifier: string | URL, options?: EmitOptions): Promise<EmitResult>;
    export interface EmitOptions {
        bundle?: "module" | "classic";
        check?: boolean;
        compilerOptions?: CompilerOptions;
        importMap?: ImportMap;
        importMapPath?: string;
        sources?: Record<string, string>;
    }
    export interface CompilerOptions {
        allowJs?: boolean;
        allowSyntheticDefaultImports?: boolean;
        allowUmdGlobalAccess?: boolean;
        allowUnreachableCode?: boolean;
        allowUnusedLabels?: boolean;
        alwaysStrict?: boolean;
        baseUrl?: string;
        charset?: string;
        checkJs?: boolean;
        declaration?: boolean;
        declarationDir?: string;
        declarationMap?: boolean;
        downlevelIteration?: boolean;
        emitDeclarationOnly?: boolean;
        emitDecoratorMetadata?: boolean;
        esModuleInterop?: boolean;
        experimentalDecorators?: boolean;
        importHelpers?: boolean;
        importsNotUsedAsValues?: "remove" | "preserve" | "error";
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        jsx?:
        | "react"
        | "preserve"
        | "react-native"
        | "react-jsx"
        | "react-jsx-dev";
        jsxFactory?: string;
        jsxFragmentFactory?: string;
        jsxImportSource?: string;
        keyofStringsOnly?: string;
        lib?: string[];
        locale?: string;
        mapRoot?: string;
        module?:
        | "none"
        | "commonjs"
        | "amd"
        | "system"
        | "umd"
        | "es6"
        | "es2015"
        | "es2020"
        | "esnext";
        noEmitHelpers?: boolean;
        noFallthroughCasesInSwitch?: boolean;
        noImplicitAny?: boolean;
        noImplicitReturns?: boolean;
        noImplicitThis?: boolean;
        noImplicitUseStrict?: boolean;
        noLib?: boolean;
        noResolve?: boolean;
        noStrictGenericChecks?: boolean;
        noUncheckedIndexedAccess?: boolean;
        noUnusedLocals?: boolean;
        noUnusedParameters?: boolean;
        paths?: Record<string, string[]>;
        preserveConstEnums?: boolean;
        removeComments?: boolean;
        rootDir?: string;
        rootDirs?: string[];
        skipLibCheck?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        strict?: boolean;
        strictBindCallApply?: boolean;
        strictFunctionTypes?: boolean;
        strictNullChecks?: boolean;
        strictPropertyInitialization?: boolean;
        suppressExcessPropertyErrors?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;
        target?:
        | "es3"
        | "es5"
        | "es6"
        | "es2015"
        | "es2016"
        | "es2017"
        | "es2018"
        | "es2019"
        | "es2020"
        | "esnext";
        types?: string[];
        useDefineForClassFields?: boolean;
    }
    export interface ImportMap {
        imports: Record<string, string>;
        scopes?: Record<string, Record<string, string>>;
    }

    export interface EmitResult {
        diagnostics: Diagnostic[];
        files: Record<string, string>;
        ignoredOptions?: string[];
        stats: Array<[string, number]>;
    }
    export interface Diagnostic {
        category: DiagnosticCategory;
        code: number;
        end?: {
            line: number;
            character: number;
        };
        fileName?: string;
        messageChain?: DiagnosticMessageChain;
        messageText?: string;
        relatedInformation?: Diagnostic[];
        source?: string;
        sourceLine?: string;
        start?: {
            line: number;
            character: number;
        };
    }
    export enum DiagnosticCategory {
        Warning = 0,
        Error = 1,
        Suggestion = 2,
        Message = 3,
    }
    interface DiagnosticMessageChain {
        category: DiagnosticCategory;
        code: number;
        messageText: string;
        next?: DiagnosticMessageChain[];
    }
}


