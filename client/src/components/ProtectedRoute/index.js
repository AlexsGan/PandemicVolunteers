/* Component for protected routes */
import React from "react";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
    render() {
        const { authenticated, exact, path, component: Component, componentProps, fallbackPath, app, ...routeProps } = this.props;
        if (authenticated) {
            if (Component.type === ProtectedRoute) {
                // Return protected route directly
                return <Component {...componentProps} {...routeProps} />;
            } else {
                // Return the component wrapped in a Route
                return (
                    <Route
                        {...routeProps}
                        exact={exact || undefined} path={path}
                        render={(props) => <Component {...props} {...componentProps} app={app}/>}
                    />
                );
            }
        } else {
            console.log(`FALLBACK ROUTE TRIGGERED`);
            return <Redirect from={path} push to={fallbackPath}/>
        }
    }
}

export default ProtectedRoute;