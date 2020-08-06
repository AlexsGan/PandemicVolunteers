/* Component for protected routes */
import React from "react";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
    render() {
        const { path, component: Component, fallbackPath, app, ...rest } = this.props;
        const isAuthenticated = app.state.currentUser;
        return (
            <Route
                {...rest}
                exact path={path}
                render={(props) => (
                    isAuthenticated ? <Component {...props} app={app}/> : <Redirect to={fallbackPath}/>
                )}
            />
        );
    }
}

export default ProtectedRoute;