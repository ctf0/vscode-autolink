import { Dictionary } from 'lodash';

export interface ExtensionConfig {
    schemes: [],
    queries: {
        linkFilePattern: string;
        linkFileLanguage: string[];
        linkPattern: string;
        linkCommand: string;
        linkText: string;
    }[];
}

export type StateQueries = Dictionary<{
    linkFilePattern: string;
    linkFileLanguage: string[];
    linkPattern: string;
    linkCommand: string;
    linkText: string;
    linkRegexp: RegExp;
}[]>;
