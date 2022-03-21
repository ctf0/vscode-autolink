import { Dictionary } from 'lodash';

export interface ExtensionConfig {
    schemes: [],
    queries: {
        linkFilePattern: string;
        linkPattern: string;
        linkCommand: string;
    }[];
}

export type StateQueries = Dictionary<{
    linkFilePattern: string;
    linkPattern: string;
    linkCommand: string;
    linkRegexp: RegExp;
}[]>;
