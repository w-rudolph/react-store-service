import * as React from 'react';
import { Subject, Unsubscribe } from './subject';
declare type InjectorFn = (val?: any) => any;
declare type Injector = {
    inject: Subject;
    mapToProps: InjectorFn;
};
declare type InjectedState = {
    injectState: any;
    injectUnsubs: Unsubscribe[];
};
export declare function connect(injectors: Injector[]): (WrappedComponent: React.ComponentType<{}>) => {
    new (props: Readonly<{}>): {
        state: InjectedState;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): React.ReactElement<{}, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{}> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: {}, context?: any): {
        state: InjectedState;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): React.ReactElement<{}, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{}> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
export {};
