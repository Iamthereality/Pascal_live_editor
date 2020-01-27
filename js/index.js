class Api_service {
    api = 'https://api.jdoodle.com/v1/execute';
    request = new XMLHttpRequest();

    xhr = (script) => {
        const program = {
            script : script,
            language: "pascal",
            versionIndex: "0",
            clientId: "ac5ed459bc6dd9a4464808c01f67d622",
            clientSecret: "ed29d54f758aaf42018355f1ae9b2be31a56be7d88390076ef0a67b7fea62522"
        };
        const data = JSON.stringify(program);
        return new Promise((resolve, reject) => {
            this.request.open('POST', `${this.api}`);
            this.request.setRequestHeader('Content-type',
                'application/json; charset=utf-8');
            this.request.send(data);
            this.request.addEventListener('readystatechange',  () => {
                if (this.request.status >= 200 && this.request.status < 300) {
                    resolve();
                } else {
                    reject();
                }
            });
        })
    };
}

document.addEventListener('DOMContentLoaded', function () {
    // import {default as Api_service} from "./api_service";

    window.editor = ace.edit("editor_field");
    const api = new Api_service();

    function getEditorValue() {
        const editor_field = document.querySelector('#editor_field');
        const result_field = document.querySelector('#result_field');
        const compile_button = document.querySelector('button');
        compile_button.addEventListener('click', function (event) {
            event.preventDefault();
            api.xhr(editor.getValue())
                .then((response) => {
                    console.log(response);
                });
            editor_field.classList.remove('full');
            result_field.classList.remove('hide');
            editor.resize();
        });
    }

    function setupEditor() {
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/pascal");
        editor.setValue(`program Greetings;
const
message = ' Welcome to the world of Pascal ';

type
name = string;
var
firstname, surname: name;

begin
   writeln('Please enter your first name: ');
   readln(firstname);
   
   writeln('Please enter your surname: ');
   readln(surname);
   
   writeln;
   writeln(message, ' ', firstname, ' ', surname);
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
});