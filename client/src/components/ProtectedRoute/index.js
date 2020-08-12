/* Component for protected routes */
import React from "react";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
    render() {
        const { authenticated, path, component: Component, fallbackPath, app, ...rest } = this.props;
        return (
            <Route
                {...rest}
                exact path={path}
                render={(props) => (
                    authenticated ? <Component {...props} app={app}/> : <Redirect to={fallbackPath}/>
                )}
            />
        );
    }
}

export default ProtectedRoute;