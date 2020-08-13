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

export const getUser = async (username) => {
    const url = `/api/users/${username}`;

    // Send request
    try {
        const res = await fetch(url);
        const body = await res.json();
        if (res.ok) {
            if (body !== undefined) {
                // Send user object
                return body;
            } else {
                return Promise.reject(new Error('User Account Response Empty'));
            }
        } else {
            if (res.status === 400) {
                return Promise.reject("username");
            }
            return Promise.reject(new Error(body));
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }

}

export const registerProfile = async (username, profileObject) => {
    const url = `/api/users/${username}/profile`;

    // Create request
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({profile: profileObject}),
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
                // Get user object with newly created profile
                const updatedUser = await getUser(username);
                if (!updatedUser) {
                    console.error('Updated user retrieved was empty.');
                    return Promise.reject();
                } else {
                    // Return the updated user object
                    return updatedUser;
                }
            } else {
                return Promise.reject(new Error('Register Profile Response Empty'));
            }
        } else {
            if (res.status === 400) {
                console.error("Error creating profile.");
                return Promise.reject({ validationError: body });
            } else if (res.status === 401) {
                return Promise.reject('unauthorized');
            }

            return Promise.reject(new Error(body));
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}