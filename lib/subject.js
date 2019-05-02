"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Subject {
    constructor() {
        this._observers = [];
    }
    subscribe(ob) {
        if (this._observers.find(t => t === ob)) {
            return () => { };
        }
        this._observers.push(ob);
        return () => this.unsubscribe(ob);
    }
    unsubscribe(ob) {
        this._observers = this._observers.filter(t => t !== ob);
    }
    next(val) {
        this._observers.forEach(ob => ob(val));
    }
}
exports.Subject = Subject;
/** emit latest value when subscribed */
class BehaviorSubject extends Subject {
    constructor(value) {
        super();
        this.value = value;
    }
    subscribe(ob) {
        const cb = super.subscribe(ob);
        this.next(this.value);
        return cb;
    }
    next(val) {
        this.value = val;
        super.next(val);
    }
}
exports.BehaviorSubject = BehaviorSubject;
/** emit value when completed */
class AsyncSubject extends Subject {
    constructor(value) {
        super();
        this.value = value;
        this.completed = false;
    }
    next(val) {
        this.value = val;
        if (this.completed) {
            super.next(this.value);
        }
    }
    complete() {
        this.completed = true;
        super.next(this.value);
    }
}
exports.AsyncSubject = AsyncSubject;
