const API_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/review`

const create = async ({ user, product, message }) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    user,
                    product,
                    message
                })
            }
        )
        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
    }
}


const remove = async ({reviewId}) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/${reviewId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                }
            }
        )
        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
    }
}

const update = async ({reviewId,message}) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/${reviewId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    message
                })
            }
        )
        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
    }
}

const fetchById = async ({reviewId}) => {
    try {
         const res = await fetch(
            `${API_ENDPOINT}/${reviewId}`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                }
            }
        )
        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
    }
}

const fetchByProductId = async ({productId}) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/product/${productId}`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                }
            }
        )
        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error)
    }
}


export {
    create,
    remove,
    update,
    fetchById,
    fetchByProductId
}