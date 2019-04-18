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
            var _this = this;
            this.canvas = canvas;
            this.settings = settings;
            this.context = this.canvas.getContext("2d");
            this.rawData = [];
            this.bubble = new util_1.circle(innerWidth * 0.5643240023823705, innerHeight * 0.4886898065426951, (innerHeight + innerWidth) / 2 * 0.305365296803653);
            this.initialize();
            window.addEventListener("mousemove", function (e) {
                var evt = e || event;
                if (!e.button)
                    return;
                if (_this.settings.moveCircle) {
                    _this.bubble.x = e.clientX;
                    _this.bubble.y = e.clientY;
                }
            });
        }
        Visualizer.prototype.initialize = function () {
            if (window.wallpaperRegisterAudioListener) {
                window.wallpaperRegisterAudioListener(this.recieveData.bind(this));
                for (var key in window) {
                    if (key.search('on') === 0) {
                        window.addEventListener(key.slice(2), function (e) { try {
                            e.preventDefault();
                        }
                        catch (_a) { } });
                    }
                }
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
            var half = this.settings.size == settings_1.sampleSize.half;
            var data = this.rawData;
            this.context.lineWidth = this.settings.lineWidth * (half ? 2 : 1);
            var L = this.rawData.slice(0, this.rawData.length / 2 | 0);
            var R = this.rawData.slice(this.rawData.length / 2 | 0, this.rawData.length);
            R.reverse();
            data = Array.from(new Array(this.rawData.length / 2)).map(function (_, i) {
                return (L[i] + R[i]) / 2;
            });
            if (!half) {
                data = data.concat(Array.from(data).reverse());
            }
            this.rawData.map(function (v) {
                return v < 0 ? 0 : v > 1 ? 1 : v;
            });
            if (this.settings.rgb) {
                this.settings.color = util_1.rgb(this.settings);
            }
            this.draw(data);
        };
        Visualizer.prototype.draw = function (soundData) {
            var _this = this;
            var ctx = this.context;
            ctx.globalCompositeOperation = "source-over";
            if (!soundData.length)
                return setTimeout(this.update.bind(this), 200);
            ctx.shadowBlur = this.settings.glow ? this.settings.glowSize : 0;
            ctx.shadowColor = ctx.strokeStyle = ctx.fillStyle = this.settings.color;
            var rotationData = this.bubble.getDegreeData(soundData.length);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            ctx.beginPath();
            ctx.lineCap = this.settings.roundLines ? "round" : "square";
            rotationData.map(function (v, i) {
                ctx.moveTo(v.x, v.y);
                ctx.lineTo(v.x + v.deltax * soundData[i] * _this.settings.height, v.y + v.deltay * soundData[i] * _this.settings.height);
            });
            ctx.stroke();
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(this.bubble.x, this.bubble.y, this.bubble.radius, 0, Math.PI * 2);
            ctx.fillStyle = "fff";
            ctx.fill();
            requestAnimationFrame(this.update.bind(this));
        };
        Visualizer.prototype.recieveData = function (data) {
            this.rawData = data;
        };
        return Visualizer;
    }());
    exports.Visualizer = Visualizer;
});
