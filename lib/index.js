(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./subject", "./connect"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var subject_1 = require("./subject");
    exports.Subject = subject_1.Subject;
    exports.BehaviorSubject = subject_1.BehaviorSubject;
    exports.AsyncSubject = subject_1.AsyncSubject;
    var connect_1 = require("./connect");
    exports.connect = connect_1.connect;
});
