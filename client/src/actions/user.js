// Check if a user is logged in on the session cookie
export const checkCookie = (app) => {
    const url = "/check-session";

    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(() => {
        });
}

// Send request to server to login a user
export const login = async (loginObject) => {
    const url = "/login";
    // Create request
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(loginObject),
        headers: {
            Accept: "application/json, text/plan, */*",
            "Content-Type": "application/json"
        }
    });
    // Send request
    try {
        const res = await fetch(request);
        const body = await res.json();
        if (res.ok) {
            if (body !== undefined) {
                return body;
            } else {
                return Promise.reject(new Error('Login Response Empty'));
            }
        } else {
            if (res.status === 400) {
                return Promise.reject('credentials')
            }

            return Promise.reject(new Error(body));
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

// A function to send a GET request to logout the current user
export const logout = async (app) => {
    const url = "/logout";

    try {
        await fetch(url);
        app.setState({
            currentUser: null
        });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};