(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./visualizer", "./settings"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var visualizer_1 = require("./visualizer");
    var settings_1 = require("./settings");
    var canvas = document.getElementById("canvas");
    if (!canvas)
        throw "Something went really wrong here";
    var settings = new settings_1.Settings({});
    var Simulation = new visualizer_1.Visualizer(settings, canvas);
    console.log(window);
    window.reload = function () {
        location.href = location.href;
    };
});
