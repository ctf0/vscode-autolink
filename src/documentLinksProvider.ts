import { Disposable, DocumentLink, env, languages, Range, Uri } from 'vscode';
import { extensionState } from './extension';

const documentLinkDisposables: Disposable[] = [];

export function updateDocumentLinkProvider() {
    disposeDocumentLinkDisposables();

    if (!Object.keys(extensionState.queries).length) {
        return;
    }

    for (const linkFilePattern in extensionState.queries) {
        const queries = extensionState.queries[linkFilePattern];

        let list = []

        for (const scheme of extensionState.schemes) {
            list.push({
                scheme: scheme,
                pattern: linkFilePattern === 'undefined' ? undefined : linkFilePattern,
            })
        }

        documentLinkDisposables.push(languages.registerDocumentLinkProvider(
            list,
            {
                provideDocumentLinks(document) {
                    const matches: DocumentLink[] = [];

                    for (let i = 0; i < document.lineCount; i++) {
                        const text = document.lineAt(i).text;

                        for (const query of queries) {
                            const regexp = query.linkRegexp;

                            for (
                                let match = regexp.exec(text);
                                match !== null;
                                match = regexp.exec(text)
                            ) {
                                const group = match[1] || match[0]
                                const args = encodeURIComponent(JSON.stringify([group]));
                                const CommandUri = Uri.parse(`command:${query.linkCommand}?${args}`);

                                matches.push({
                                    range: new Range(i, match.index, i, match[0].length + match.index),
                                    target: CommandUri,
                                    tooltip: `Command-Autolink: ${query.linkText}`,
                                });
                            }
                        }
                    }

                    return matches;
                },
            },
        ));
    }
}

function disposeDocumentLinkDisposables() {
    for (const disposable of documentLinkDisposables) {
        disposable.dispose();
    }

    documentLinkDisposables.length = 0;
}
