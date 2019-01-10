var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var sampleSize;
    (function (sampleSize) {
        sampleSize[sampleSize["full"] = 0] = "full";
        sampleSize[sampleSize["half"] = 1] = "half";
    })(sampleSize = exports.sampleSize || (exports.sampleSize = {}));
    var PropertyType;
    (function (PropertyType) {
        PropertyType["boolean"] = "bool";
        PropertyType["color"] = "color";
        PropertyType["radio"] = "multi";
        PropertyType["number"] = "slider";
        PropertyType["file"] = "file";
        PropertyType["text"] = "text";
    })(PropertyType = exports.PropertyType || (exports.PropertyType = {}));
    var WallpaperSettings = (function () {
        function WallpaperSettings() {
            this.size = sampleSize.half;
            this.height = 100;
        }
        return WallpaperSettings;
    }());
    var Settings = (function (_super) {
        __extends(Settings, _super);
        function Settings(Object) {
            var _this = _super.call(this) || this;
            _this.initialize();
            return _this;
        }
        Settings.prototype.initialize = function () {
            var _this = this;
            window.wallpaperPropertyListener = {
                applyUserProperties: function (properties) {
                    for (var key in properties) {
                        _this.assignProperty(key, properties[key]);
                    }
                }
            };
        };
        Settings.prototype.assignProperty = function (name, value) {
            if (Object.keys(this).indexOf(name) != -1) {
                this[name] = HandleProperties(value);
            }
        };
        return Settings;
    }(WallpaperSettings));
    exports.Settings = Settings;
    function HandleProperties(property) {
        switch (property.type) {
            case PropertyType.boolean:
                return property.value;
            case PropertyType.radio:
                return property.value;
            case PropertyType.number:
                return property.value;
            case PropertyType.text:
                return;
            case PropertyType.file:
                return decodeURIComponent(property.value);
            case PropertyType.color:
                var c = property.value;
                return "#" + c.split(" ").map(function (v) { var c = (parseFloat(v) * 255 | 0).toString(16); return c.length < 2 ? "0" + c : c; }).join("");
        }
    }
    exports.HandleProperties = HandleProperties;
});
