import Command from '@shopify/cli-kit/node/base-command';
export default class PrintAIPrompt extends Command {
    static description: string;
    static hidden: boolean;
    run(): Promise<void>;
}
