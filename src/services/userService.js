const SERVER_API = process.env.NODE_ENV === 'development'
                   ? "http://localhost:4000/api"
                   : "";

export const loginUser = (user) => {
    return fetch(`${SERVER_API}/login`, {
        method: "POST",
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    });
}

export const signupUser = (user) => {
    let image = "/images/U.png";
    if (user.role === "restaurant") {
        image = "/images/R.png";
    } else if (user.role === "waiter") {
        image = "/images/E.png";
    }
    user = {
        ...user,
        image
    }
    return fetch(`${SERVER_API}/signup`, {
        method: "POST",
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    });
}

export const getProfile = () => {
    return fetch(`${SERVER_API}/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json());
}

export const logoutUser = () => {
    return fetch(`${SERVER_API}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    })
}

export const findProfileById = (_id) => {
    return fetch(`${SERVER_API}/findProfile`, {
        method: "POST",
        body: JSON.stringify({_id}),
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    }).then((response) => response.json());
}

export const editUser = (user) => {
    return fetch(`${SERVER_API}/signup`, {
        method: "PUT",
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    });
}