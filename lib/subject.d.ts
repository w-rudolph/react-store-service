export declare type Observer = (arg?: any) => void;
export declare type Unsubscribe = () => void;
export interface Subscrition {
    subscribe(ob: Observer): Unsubscribe;
    unsubscribe(ob: Observer): void;
    next(val?: any): void;
}
export declare class Subject implements Subscrition {
    protected _observers: Observer[];
    subscribe(ob: Observer): Unsubscribe;
    unsubscribe(ob: Observer): void;
    next(val?: any): void;
}
/** emit latest value when subscribed */
export declare class BehaviorSubject<T> extends Subject {
    protected value: T;
    constructor(value: T);
    subscribe(ob: Observer): Unsubscribe;
    next(val: T): void;
}
/** emit value when completed */
export declare class AsyncSubject<T> extends Subject {
    protected value: T;
    protected completed: boolean;
    constructor(value: T);
    next(val: T): void;
    complete(): void;
}
