const API_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/product`

const create = async ({title,description,price,discount,owner,isPublished}) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/`,
            {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    title,
                    description,
                    price,
                    discount,
                    owner,
                    isPublished
                })
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const remove = async ({id}) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/${id}`,
            {
                method:"DELETE",
                headers:{
                    "Content-type":"application/json"
                }
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const update = async ({id,title, description, price, discount, owner, isPublished }) => {
    try {
         const res = await fetch(
            `${API_ENDPOINT}/${id}`,
            {
                method:"PATCH",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    title,
                    description,
                    price,
                    discount,
                    owner,
                    isPublished
                })
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}


const fetchById = async ({id}) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/${id}`,
            {
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            }
        )
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const fetchAll = async ({limit}) => {
    try {
         const res = await fetch(
            `${API_ENDPOINT}/`,
            {
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "limit":`${limit}`
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
    update,
    fetchById,
    fetchAll
}