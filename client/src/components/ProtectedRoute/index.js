/* Component for protected routes */
import React from "react";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
    render() {
        const { authenticated, path, component: Component, componentProps, fallbackPath, app, ...routeProps } = this.props;
        const renderRoute = () => {
            if (authenticated) {
                if (Component.type === ProtectedRoute) {
                    // Return protected route directly
                    return <Component {...componentProps} {...routeProps} />;
                } else {
                    // Return the component wrapped in a Route
                    return (
                        <Route
                            {...routeProps}
                            exact path={path}
                            render={(props) => <Component {...props} {...componentProps} app={app}/>}
                        />
                    );
                }
            } else {
                return <Redirect from={path} push to={fallbackPath}/>
            }

        }

        return (
            renderRoute()
        );
    }
}

export default ProtectedRoute;