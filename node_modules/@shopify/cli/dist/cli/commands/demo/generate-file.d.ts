import Command from '@shopify/cli-kit/node/base-command';
export default class GenerateFile extends Command {
    static description: string;
    static summary: string;
    static hidden: boolean;
    static flags: {
        path: import("@oclif/core/lib/interfaces/parser.js").OptionFlag<string, import("@oclif/core/lib/interfaces/parser.js").CustomOptions>;
        file: import("@oclif/core/lib/interfaces/parser.js").OptionFlag<string, import("@oclif/core/lib/interfaces/parser.js").CustomOptions>;
    };
    run(): Promise<void>;
}
