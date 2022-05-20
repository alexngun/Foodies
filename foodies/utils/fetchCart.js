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
    if(post.list) {
        for(var i = 0; i < post.list.length; i++)
            post.list[i].qty = post.cart[i].qty
    }
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

    Object.keys(items).forEach( (key, i) => {
        post[i].qty = items[key].qty
    })

    return post
}

export const calculateTotalItems = items => {
    try {
        var sum = 0
        items.forEach( item=> {
            sum+=item.qty
        })
        return sum
    } catch {
        return 0
    }
}