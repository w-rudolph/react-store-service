import * as React from 'react';
import { Subject, Unsubscribe } from './subject';

type InjectorFn = (val?: any) => any;
type Injector = {
  inject: Subject;
  mapToProps: InjectorFn;
};
type InjectedState = {
  injectState: any;
  injectUnsubs: Unsubscribe[];
};
export function connect(injectors: Injector[]) {
  return function(WrappedComponent: React.ComponentType) {
    return class Hoc extends React.Component {
      state = {
        injectState: {},
        injectUnsubs: []
      } as InjectedState;
      componentWillMount() {
        let newInjectedState = {};
        let injectUnsubs: Unsubscribe[] = [];
        injectors.forEach(injector => {
          const injectUnsub = injector.inject.subscribe((ret: any) => {
            newInjectedState = {
              ...newInjectedState,
              ...injector.mapToProps(ret)
            };
            this.setState({
              injectState: newInjectedState
            });
          });
          injectUnsubs.push(injectUnsub);
        });
        this.setState({
          injectUnsubs: injectUnsubs
        });
      }

      componentWillUnmount() {
        const injectState = this.state as InjectedState;
        injectState.injectUnsubs.forEach(unsub => {
          unsub();
        });
      }

      render() {
        return React.createElement(WrappedComponent, {
          ...this.props,
          ...(this.state as InjectedState).injectState
        });
      }
    };
  };
}
