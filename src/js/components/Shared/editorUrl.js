export default function editorUrl(config, file, lineNumber) {
    const editor = config.editor;
    const editors = {
        sublime: 'subl://open?url=file://%path&line=%line',
        textmate: 'txmt://open?url=file://%path&line=%line',
        emacs: 'emacs://open?url=file://%path&line=%line',
        macvim: 'mvim://open/?url=file://%path&line=%line',
        phpstorm: 'phpstorm://open?file=%path&line=%line',
        idea: 'idea://open?file=%path&line=%line',
        vscode: 'vscode://file/%path:%line',
        'vscode-insiders': 'vscode-insiders://file/%path:%line',
        atom: 'atom://core/open/file?filename=%path&line=%line',
    };

    file =
        (config.remoteSitesPath || false).length > 0 && (config.localSitesPath || false).length > 0
            ? file.replace(config.remoteSitesPath, config.localSitesPath)
            : file;

    file = (config.applicationPath || false).length > 0 ? config.applicationPath + file : file;

    if (!Object.keys(editors).includes(editor)) {
        console.error(
            `'${editor}' is not supported. Support editors are: ${Object.keys(editors).join(', ')}`,
        );

        return null;
    }

    console.log(config, file, lineNumber);

    return editors[editor]
        .replace('%path', encodeURIComponent(file))
        .replace('%line', encodeURIComponent(lineNumber));
}
