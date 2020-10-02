// Check if a user is logged in on the session cookie
export const checkCookie = (app) => {
    const url = "/session/check-session";
    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                app.setState({ currentUser: json, userUpdated: false });
            } else {
                app.setState({ currentUser: null, userUpdated: false });
            }
        })
        .catch();
}

// Send request to server to login a user
export const login = async (loginObject) => {
    const url = "/session/login";
    // Create request
    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(loginObject),
        headers: {
            "Accept": "application/json, text/plan, */*",
            "Content-Type": "application/json"
        }
    });
    // Send request
    try {
        const res = await fetch(request);
        if (res.ok) {
            const body = await res.json();
            if (body !== undefined) {
                return body;
            } else {
                return Promise.reject(new Error('Login Response Empty'));
            }
        } else {
            if (res.status === 401) {
                return Promise.reject('credentials')
            }
            return Promise.reject(new Error('Internal Server Error'));
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

// A function to send a GET request to logout the current user
export const logout = async (app) => {
    const url = "/session/logout";
    // Create request
    const request = new Request(url, {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plan, */*",
            "Content-Type": "application/json"
        }
    });
    try {
        const res = await fetch(request);
        if (res.ok) {
            app.setState({
                userUpdated: true
            });
        } else {
            return Promise.reject(new Error('Internal Server Error'));
        }
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

export const registerUser = async (userObject) => {
    const url = `/api/users`;

    // Create request
    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify({ userObject: userObject }),
        headers: {
            "Accept": "application/json, text/plan, */*",
            "Content-Type": "application/json"
        }
    });
    // Send request
    try {
        const res = await fetch(request);
        if (res.ok) {
            const body = await res.json();
            if (body !== undefined) {
                // Resolve promise
                return true;
            } else {
                return Promise.reject(new Error('Register Profile Response Empty'));
            }
        } else {
            switch (res.status) {
                case 400:
                case 403:
                    const body = await res.json();
                    console.error("Error creating user.");
                    return Promise.reject({ validationError: body });
                case 409:
                    return Promise.reject('exists');
                default:
                    return Promise.reject(new Error("Internal Server Error"));
            }
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
        method: "PUT",
        body: JSON.stringify({ profile: profileObject }),
        headers: {
            "Accept": "application/json, text/plan, */*",
            "Content-Type": "application/json"
        }
    });
    // Send request
    try {
        const res = await fetch(request);
        if (res.ok) {
            const body = await res.json();
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
                const body = await res.json();
                console.error("Error creating profile.");
                return Promise.reject({ validationError: body });
            } else if (res.status === 401) {
                return Promise.reject('unauthorized');
            }
            return Promise.reject(new Error("Internal Server Error"));
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const updateUser = async (username, userObject) => {
    const url = `/api/users/${username}`;

    // Create request
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify({ props: userObject }),
        headers: {
            "Accept": "application/json, text/plan, */*",
            "Content-Type": "application/json"
        }
    });
    // Send request
    try {
        const res = await fetch(request);
        if (res.ok) {
            const body = await res.json();
            if (body !== undefined) {
                // Return the updated user object
                return body;
            } else {
                return Promise.reject(new Error('Update User Response Empty'));
            }
        } else {
            switch (res.status) {
                case 400:
                case 403:
                case 404:
                    const body = await res.json();
                    console.error("Error updating user.");
                    return Promise.reject({ validationError: body });
                case 401:
                    return Promise.reject('unauthorized');
                case 409:
                    return Promise.reject('exists');
                default:
                    return Promise.reject(new Error("Internal Server Error"));
            }
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const updateProfile = async (username, profileObject) => {
    const url = `/api/users/${username}/profile`;

    // Create request
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify({ props: profileObject }),
        headers: {
            "Accept": "application/json, text/plan, */*",
            "Content-Type": "application/json"
        }
    });
    // Send request
    try {
        const res = await fetch(request);
        if (res.ok) {
            const body = await res.json();
            if (body !== undefined) {
                // Return the updated profile object
                return body;
            } else {
                return Promise.reject(new Error('Update Profile Response Empty'));
            }
        } else {
            switch (res.status) {
                case 400:
                case 403:
                case 404:
                    const body = await res.json();
                    console.error("Error updating profile.");
                    return Promise.reject({ validationError: body });
                case 401:
                    return Promise.reject('unauthorized');
                case 409:
                    return Promise.reject('exists');
                default:
                    return Promise.reject(new Error("Internal Server Error"));
            }
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}