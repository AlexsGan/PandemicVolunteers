// A function to send a GET request to the web server,
// and then loop through them and add a list element for each helpRequest
export const getRequests = (requestList) => {
    // the URL for the request
    const url = "/requests";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get requests");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            requestList.setState({ requestList: json.requests });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to update the helpRequest form state
export const updateRequestForm = (formComp, field) => {
    const value = field.value;
    const name = field.name;

    formComp.setState({
        [name]: value
    });
};

// A function to send a POST request with a new helpRequest
export const addRequest = (formComp, dashboardComp) => {
    // the URL for the request
    const url = "/students";

    // The data we are going to send in our request
    const helpRequest = formComp.state

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(helpRequest),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If helpRequest was added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a helpRequest.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add the helpRequest, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not add helpRequest.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};
