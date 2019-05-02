"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function connect(injectors) {
    return function (WrappedComponent) {
        return class Hoc extends React.Component {
            constructor() {
                super(...arguments);
                this.state = {
                    injectState: {},
                    injectUnsubs: []
                };
            }
            componentWillMount() {
                let newInjectedState = {};
                let injectUnsubs = [];
                injectors.forEach(injector => {
                    const injectUnsub = injector.inject.subscribe((ret) => {
                        newInjectedState = Object.assign({}, newInjectedState, injector.mapToProps(ret));
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
                const injectState = this.state;
                injectState.injectUnsubs.forEach(unsub => {
                    unsub();
                });
            }
            render() {
                return React.createElement(WrappedComponent, Object.assign({}, this.props, this.state.injectState));
            }
        };
    };
}
exports.connect = connect;
