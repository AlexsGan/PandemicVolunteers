// Check if a user is logged in on the session cookie
export const checkCookie = (app) => {
    const url = "/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.error(error);
        });
}

// Send request to server to login a user
export const login = (loginObject, app) => {
    const url = "/login";
    let success = false;
    // Create request
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
            username: loginObject.username,
            password: loginObject.password
        }),
        headers: {
            Accept: "application/json, text/plan, */*",
            "Content-Type": "application/json"
        }
    });
    // Send request
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
                success = true;
            }
        })
        .catch(error => {
            console.log(error);
            success = false;
        });
    return success;
}

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/logout";

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null
            });
        })
        .catch(error => {
            console.error(error);
        });
};