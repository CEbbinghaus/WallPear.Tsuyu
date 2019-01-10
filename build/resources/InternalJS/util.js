(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function NoiseGenerator(method) {
        var i = 0;
        var generator = function () {
            var result = Array.from(new Array(64)).map(function () {
                i += 0.1;
                return Math.sin(i) + 1;
            });
            return result.concat(Array.from(result).reverse());
        };
        window.setInterval(function () { method(generator()); }, 200);
        return;
    }
    exports.NoiseGenerator = NoiseGenerator;
    var circle = (function () {
        function circle(x, y, radius) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (radius === void 0) { radius = 5; }
            this.x = x;
            this.y = y;
            this.radius = radius;
            console.log(this.getDegreeData(20));
        }
        circle.prototype.fill = function (ctx) {
            ctx.clearRect(0, 0, 1e5, 1e5);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        };
        circle.prototype.getDegreeData = function (sliceCount) {
            var _this = this;
            var sliceDegree = Math.PI * 2 / sliceCount;
            var result = Array.from(new Array(sliceCount)).map(function (_, i) {
                var sin = Math.sin(sliceDegree * i);
                var cos = Math.cos(sliceDegree * i);
                var s = {
                    deltax: sin,
                    deltay: cos,
                    index: i,
                    x: _this.x + _this.radius * sin,
                    y: _this.y + _this.radius * cos,
                    whole: _this
                };
                return s;
            });
            return result;
        };
        return circle;
    }());
    exports.circle = circle;
});
