class Api_service {
    api = 'https://api.jdoodle.com/v1/execute';
    proxyurl = "https://cors-anywhere.herokuapp.com/";
    request = new XMLHttpRequest();

    get_data = async (script) => {
        const program = {
            script : script,
            language: "pascal",
            versionIndex: "0",
            clientId: "ac5ed459bc6dd9a4464808c01f67d622",
            clientSecret: "ed29d54f758aaf42018355f1ae9b2be31a56be7d88390076ef0a67b7fea62522"
        };
        const data = JSON.stringify(program);
        const url = `${this.proxyurl}${this.api}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: data
        };
        const server_response = await fetch(url, params);
        if (!server_response.ok) {
            throw new Error(`Could not fetch ${this.api}, received ${server_response.status}`);
        }
        return await server_response.json();
    };
}

document.addEventListener('DOMContentLoaded', function () {

    window.editor = ace.edit("editor_field");
    const api = new Api_service();
    const editor_field = document.querySelector('#editor_field');
    const result_field = document.querySelector('#result_field');

    function getEditorValue() {
        const spinner = document.querySelector('.loading_spinner');
        const pre = result_field.querySelector('pre');
        const compile_button = document.querySelector('button');
        compile_button.addEventListener('click', function (event) {
            event.preventDefault();
            spinner.classList.remove('hide');
            pre.innerHTML = '';
            api.get_data(editor.getValue())
                .then((response) => {
                    spinner.classList.add('hide');
                    editor_field.classList.remove('full');
                    result_field.classList.remove('hide');
                    editor.resize();
                    pre.innerHTML = response.output;
                });
        });
    }

    function close_result() {
        const close = document.querySelector('#close_result');
        close.addEventListener('click', function () {
            editor_field.classList.add('full');
            result_field.classList.add('hide');
            editor.resize();
        });
    }

    function setupEditor() {
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/pascal");
        editor.setValue(`program Hello_World;

var
message : string;

begin
   message := 'Hello, World!';
   writeln(message);
end.`,1);

        editor.getSession().setUseWrapMode(true);
        editor.focus();

        editor.setOptions({
            fontSize: "16pt",
            showLineNumbers: true,
            showGutter: true,
            vScrollBarAlwaysVisible: false,
        });

        editor.setShowPrintMargin(false);
        editor.setBehavioursEnabled(false);
        getEditorValue();
    }

    setupEditor();
    close_result();
});