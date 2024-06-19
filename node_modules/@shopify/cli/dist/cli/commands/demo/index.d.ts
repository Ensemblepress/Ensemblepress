import Command from '@shopify/cli-kit/node/base-command';
export default class Demo extends Command {
    static description: string;
    static hidden: boolean;
    static flags: {
        file: import("@oclif/core/lib/interfaces/parser.js").OptionFlag<string, import("@oclif/core/lib/interfaces/parser.js").CustomOptions>;
    };
    run(): Promise<void>;
}
