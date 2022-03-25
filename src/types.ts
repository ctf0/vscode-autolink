import { Dictionary } from 'lodash';

export interface ExtensionConfig {
    schemes: [],
    queries: {
        linkFilePattern: string;
        linkPattern: string;
        linkCommand: string;
        linkText: string;
    }[];
}

export type StateQueries = Dictionary<{
    linkFilePattern: string;
    linkPattern: string;
    linkCommand: string;
    linkText: string;
    linkRegexp: RegExp;
}[]>;
