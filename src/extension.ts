import { Dictionary, groupBy } from 'lodash';
import { ExtensionContext, workspace } from 'vscode';
import { updateDocumentLinkProvider } from './documentLinksProvider';
import { ExtensionConfig, StateQueries } from './types';

export const enum Constants {
    extensionName = 'commandAutolink',
}

export let extensionConfig: ExtensionConfig;

export abstract class extensionState {
    static schemes: [];
    static queries: StateQueries = {};
}

export function activate(extensionContext: ExtensionContext) {
    updateConfig();
    updateEverything();

    function updateConfig() {
        extensionConfig = workspace.getConfiguration().get(Constants.extensionName) as ExtensionConfig;
    }

    function updateEverything() {
        updateQueries();
        updateDocumentLinkProvider();
    }

    extensionContext.subscriptions.push(workspace.onDidChangeConfiguration(e => {
        if (!e.affectsConfiguration(Constants.extensionName)) {
            return;
        }
        updateConfig();
        updateEverything();
    }));
}
/**
 * Group by linkFilePattern to register fewer `documentLinkProvider`s.
 * Create regexp from linkPattern (with global flag)
 */
function updateQueries() {
    const groupedQueries = groupBy(
        extensionConfig.queries,
        'linkFilePattern' as keyof ExtensionConfig['queries'][number]
    ) as Dictionary<{
        linkFilePattern: string;
        linkPattern: string;
        linkCommand: string;
        linkRegexp: RegExp;
    }[]>;

    for (const linkFilePattern in groupedQueries) {
        const queries = groupedQueries[linkFilePattern];

        for (const query of queries) {
            query.linkRegexp = new RegExp(query.linkPattern, 'g');
        }
    }

    extensionState.queries = groupedQueries;
    extensionState.schemes = extensionConfig.schemes;
}

export function deactivate() { }
