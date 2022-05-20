export const ConnectRemoteCart = async (method, payload) => {
    const request = payload ? {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
    } : 
    {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }

    const res = await fetch("http://localhost:3000/api/cart", request)
    const post = await res.json()
    return post
}

export const ConnectLocalCart = async (method, payload) => {
    let items = typeof window != "undefined" && window.localStorage.getItem("cart")
    items = JSON.parse(items)
    var params = ""
    Object.keys(items).forEach( key=> {
        params += `${key}/` 
    })

    const res = await fetch(`http://localhost:3000/api/menu/${params}`, {
                        method: "GET",
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: { 'Content-Type': 'application/json'},
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                      })
    const post = await res.json()
    return post
}