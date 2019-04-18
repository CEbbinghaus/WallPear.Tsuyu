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
    var hslToRgb = function (hue, saturation, lightness) {
        if (hue == undefined) {
            return [0, 0, 0];
        }
        var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
        var huePrime = hue / 60;
        var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));
        huePrime = Math.floor(huePrime);
        var red;
        var green;
        var blue;
        if (huePrime === 0) {
            red = chroma;
            green = secondComponent;
            blue = 0;
        }
        else if (huePrime === 1) {
            red = secondComponent;
            green = chroma;
            blue = 0;
        }
        else if (huePrime === 2) {
            red = 0;
            green = chroma;
            blue = secondComponent;
        }
        else if (huePrime === 3) {
            red = 0;
            green = secondComponent;
            blue = chroma;
        }
        else if (huePrime === 4) {
            red = secondComponent;
            green = 0;
            blue = chroma;
        }
        else if (huePrime === 5) {
            red = chroma;
            green = 0;
            blue = secondComponent;
        }
        var lightnessAdjustment = lightness - (chroma / 2);
        red += lightnessAdjustment;
        green += lightnessAdjustment;
        blue += lightnessAdjustment;
        return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
    };
    function max(val, n) {
        return (val > n) ? n : val;
    }
    function min(val, n) {
        return (val < n) ? n : val;
    }
    function cycle(val) {
        val = max(val, 1e7);
        val = min(val, -1e7);
        while (val < 0) {
            val += 360;
        }
        while (val > 359) {
            val -= 360;
        }
        return val;
    }
    function hsl(hue, saturation, luminosity) {
        if (saturation === void 0) { saturation = 100; }
        if (luminosity === void 0) { luminosity = 50; }
        hue = cycle(hue);
        saturation = min(max(saturation, 100), 0);
        luminosity = min(max(luminosity, 100), 0);
        saturation /= 100;
        luminosity /= 100;
        var rgb = hslToRgb(hue, saturation, luminosity);
        return '#' + rgb
            .map(function (n) {
            return (256 + n).toString(16).substr(-2);
        })
            .join('');
    }
    exports.hsl = hsl;
});
