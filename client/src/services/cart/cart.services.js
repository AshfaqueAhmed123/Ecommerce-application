const API_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/cart`

const create = async ({ product, quantity, owner }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    product,
                    quantity,
                    owner
                })
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const remove = async ({ id }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/${id}`,
            {
                method: "DELETE",
                header: {
                    "Content-type": "application/json",
                }
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const updateQuantity = async ({ id, quantity }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/${id}`,
            {
                method:"PATCH",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                   quantity
                })
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const emptyCart = async ({ userId }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/user/${userId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                }
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const fetchByUserId = async ({ userId }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/user/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                }
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}


export {
    create,
    remove,
    updateQuantity,
    emptyCart,
    fetchByUserId
}