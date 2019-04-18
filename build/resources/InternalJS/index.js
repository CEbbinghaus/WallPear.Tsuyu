(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./visualizer", "./settings", "./util"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var visualizer_1 = require("./visualizer");
    var settings_1 = require("./settings");
    var util_1 = require("./util");
    var canvas = document.getElementById("canvas");
    if (!canvas)
        throw "Something went really wrong here";
    var settings = new settings_1.Settings({});
    var Simulation = new visualizer_1.Visualizer(settings, canvas);
    console.log(util_1.generateJSON(settings));
    window.reload = function () {
        if (window["timout"]) {
            window.clearTimeout(window["timout"]);
        }
        window["timout"] = window.setTimeout(function () {
        }, 1000);
    };
});
