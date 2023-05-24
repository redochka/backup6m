import {loadConfigurationFiles} from "../src/config-loader";

const fs = require('fs');
const yaml = require('js-yaml');

test('loading yml', done => {

    try {
        let files = loadConfigurationFiles();
        console.log(files);
    } catch (e) {
        console.log(e);
    }

    done();
});

test('call TS', done => {
    const configLoader = require("../src/config-loader")
    const files = configLoader.loadConfigurationFiles();
    console.log(files);
    done();
});
