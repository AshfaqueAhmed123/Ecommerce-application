const API_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/user`

const register = async ({ fullName, username, email, password }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/register`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    fullName: fullName,
                    username: username,
                    email: email,
                    password: password
                })
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const login = async ({ username, email, password }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/login`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const logout = async ({ token }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/logout`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const refreshAccessToken = async ({ refreshToken }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/refresh-access-token`,
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    incomingRefreshToken: refreshToken
                })
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

export {
    register,
    login,
    logout,
    refreshAccessToken
}