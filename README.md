# Command Autolink

Match links in document via regex and run a command on click. [Api Used](https://code.visualstudio.com/api/extension-guides/command#command-uris)

- based on https://github.com/usernamehw/vscode-autolink

<br>

> ## The Reason Behind This
>
> is to use the <kbd>alt/ctrl</kbd> <kbd>+</kbd> <kbd>click</kbd> dynamically instead of creating numerous extensions with single usage or ask an extension author to add a link provider to something in specific.

<br>

<br>

### Example :

```jsonc
"commandAutolink.queries": [
    {
        "linkFilePattern": "**/*.{ts,js}", // defaults to "*"
        "linkPattern": "[^\\s]+\\.[^\\s]+", // any regex to match the text
        "linkCommand": "seito-openfile.openFileFromText", // command id to execute when clicking the matched pattern link
    },
],
```

#### Notes :

- some commands doesn't require any arguments ex.[Open File](https://gitlab.com/fr43nk/seito-openfile)
- and some other requires an argument to be passed to the command to work which in this case the first captured group in the `linkPattern` will be used.
