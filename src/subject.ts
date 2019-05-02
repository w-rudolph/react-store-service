export type Observer = (arg?: any) => void;
export type Unsubscribe = () => void;

export interface Subscrition {
  subscribe(ob: Observer): Unsubscribe;
  unsubscribe(ob: Observer): void;
  next(val?: any): void;
}

export class Subject implements Subscrition {
  protected _observers: Observer[] = [];
  subscribe(ob: Observer): Unsubscribe {
    if (this._observers.find(t => t === ob)) {
      return () => {};
    }
    this._observers.push(ob);
    return () => this.unsubscribe(ob);
  }

  unsubscribe(ob: Observer) {
    this._observers = this._observers.filter(t => t !== ob);
  }

  next(val?: any) {
    this._observers.forEach(ob => ob(val));
  }
}

/** emit latest value when subscribed */
export class BehaviorSubject<T> extends Subject {
  constructor(protected value: T) {
    super();
  }

  subscribe(ob: Observer): Unsubscribe {
    const cb = super.subscribe(ob);
    this.next(this.value);
    return cb;
  }
  next(val: T) {
    this.value = val;
    super.next(val);
  }
}

/** emit value when completed */
export class AsyncSubject<T> extends Subject {
  protected completed = false;
  constructor(protected value: T) {
    super();
  }

  next(val: T) {
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
