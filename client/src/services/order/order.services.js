const API_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/order`

const place = async ({user,product,address,payment_method}) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/`,
            {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    user,product,address,payment_method
                })
            }
        );
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const remove = async ({orderId}) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/${orderId}`,
            {
                method:"DELETE",
                headers:{
                    "Content-type":"application/json"
                }
            }
        );
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)
    }
}

const fetchAll = async () => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/`,
            {
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                    "limit":"10"
                }
            }
        );
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)   
    }
}

const updateStatus = async ({orderId,status}) => {
    try {
        const res = await fetch(
            `${API_ENDPOINT}/${orderId}`,
            {
                method:"PATCH",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify({
                    status
                })
            }
        );
        const data = await res.json();
        return data
    } catch (error) {
        console.error(error)   
    }
}

export {place,remove,fetchAll,updateStatus}
