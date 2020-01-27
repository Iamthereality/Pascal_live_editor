export default class {
    _api = 'https://api.jdoodle.com/v1/execute';

    constructor(script = "") {
        this.request = new XMLHttpRequest();
        this.script = script;
    }

    program = {
        script : this.script,
        language: "pascal",
        versionIndex: "fpc-3.0.4",
        clientId: "ac5ed459bc6dd9a4464808c01f67d622",
        clientSecret: "ed29d54f758aaf42018355f1ae9b2be31a56be7d88390076ef0a67b7fea62522"
    };

    data = JSON.stringify(this.program);

    log = () => {
        console.log(this.data);
    }

    // xhr = (data) => {
    //     return new Promise((resolve, reject) => {
    //         this.request.open('POST', '_api');
    //         this.request.setRequestHeader('Content-type',
    //             'application/json; charset=utf-8');
    //         this.request.send(data);
    //         this.request.addEventListener('readystatechange',  () => {
    //             if (this.request.status >= 200 && this.request.status < 300) {
    //                 resolve();
    //             } else {
    //                 reject();
    //             }
    //         });
    //     })
    // };
}