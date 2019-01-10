(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./settings", "./util"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var settings_1 = require("./settings");
    var util_1 = require("./util");
    var Visualizer = (function () {
        function Visualizer(settings, canvas) {
            this.canvas = canvas;
            this.settings = settings;
            this.context = this.canvas.getContext("2d");
            this.rawData = [];
            this.bubble = new util_1.circle(innerWidth * 0.5643240023823705, innerHeight * 0.4886898065426951, (innerHeight + innerWidth) / 2 * 0.305365296803653);
            this.initialize();
        }
        Visualizer.prototype.initialize = function () {
            if (window.wallpaperRegisterAudioListener) {
                window.wallpaperRegisterAudioListener(this.recieveData.bind(this));
            }
            else {
                util_1.NoiseGenerator(this.recieveData.bind(this));
            }
            onresize = this.resize.bind(this);
            this.resize();
            this.update();
        };
        Visualizer.prototype.resize = function () {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;
        };
        Visualizer.prototype.update = function () {
            if (!this.rawData.length)
                return this.draw([]);
            if (this.rawData.length % 2 !== 0)
                this.rawData.pop();
            var data = this.rawData;
            if (this.settings.size == settings_1.sampleSize.half) {
                var L_1 = this.rawData.slice(0, this.rawData.length / 2);
                var R_1 = this.rawData.slice(this.rawData.length / 2, this.rawData.length);
                R_1.reverse();
                data = Array.from(new Array(this.rawData.length / 2)).map(function (_, i) {
                    return (L_1[i] + R_1[i]) / 2;
                });
            }
            this.rawData.map(function (v) {
                return v < 0 ? 0 : v > 1 ? 1 : v;
            });
            this.context.lineWidth = 20;
            this.draw(data);
        };
        Visualizer.prototype.draw = function (soundData) {
            var _this = this;
            var ctx = this.context;
            ctx.clearRect(0, 0, 1e5, 1e5);
            if (!soundData.length)
                return setTimeout(this.update.bind(this), 200);
            var rotationData = this.bubble.getDegreeData(soundData.length);
            rotationData.map(function (v, i) {
                ctx.moveTo(v.x, v.y);
                ctx.lineTo(v.x + v.deltax * soundData[i] * _this.settings.height, v.y + v.deltay * soundData[i] * _this.settings.height);
                ctx.stroke();
            });
            requestAnimationFrame(this.update.bind(this));
        };
        Visualizer.prototype.recieveData = function (data) {
            this.rawData = data;
        };
        return Visualizer;
    }());
    exports.Visualizer = Visualizer;
});
