"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Subject = /** @class */ (function () {
    function Subject() {
        this._observers = [];
    }
    Subject.prototype.subscribe = function (ob) {
        var _this = this;
        if (this._observers.find(function (t) { return t === ob; })) {
            return function () { };
        }
        this._observers.push(ob);
        return function () { return _this.unsubscribe(ob); };
    };
    Subject.prototype.unsubscribe = function (ob) {
        this._observers = this._observers.filter(function (t) { return t !== ob; });
    };
    Subject.prototype.next = function (val) {
        this._observers.forEach(function (ob) { return ob(val); });
    };
    return Subject;
}());
exports.Subject = Subject;
/** emit latest value when subscribed */
var BehaviorSubject = /** @class */ (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    BehaviorSubject.prototype.subscribe = function (ob) {
        var cb = _super.prototype.subscribe.call(this, ob);
        this.next(this.value);
        return cb;
    };
    BehaviorSubject.prototype.next = function (val) {
        this.value = val;
        _super.prototype.next.call(this, val);
    };
    return BehaviorSubject;
}(Subject));
exports.BehaviorSubject = BehaviorSubject;
/** emit value when completed */
var AsyncSubject = /** @class */ (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.completed = false;
        return _this;
    }
    AsyncSubject.prototype.next = function (val) {
        this.value = val;
        if (this.completed) {
            _super.prototype.next.call(this, this.value);
        }
    };
    AsyncSubject.prototype.complete = function () {
        this.completed = true;
        _super.prototype.next.call(this, this.value);
    };
    return AsyncSubject;
}(Subject));
exports.AsyncSubject = AsyncSubject;
