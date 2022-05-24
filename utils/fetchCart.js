
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

    const res = await fetch(`${process.env.HOST}/api/cart`, request)
    const post = await res.json()
    if(post.list) {
        for(var i = 0; i < post.list.length; i++)
            post.list[i].qty = post.cart[i].qty
    }
    return post
}

export const ConnectLocalCart = async () => {

    let items = typeof window != "undefined" && window.localStorage.getItem("cart")
    items = JSON.parse(items)
    var params = ""

    if(items) {
        Object.keys(items).forEach( key=> {
            params += `${key}/` 
        })
    
        if(params!=="") {
            const res = await fetch(`${process.env.HOST}/api/menu/${params}`, {
                method: "GET",
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json'},
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
              })
            const post = await res.json()
    
            if(post.data) {
                Object.keys(items).forEach( (key, i) => {
                    post.data.qty = items[key].qty
                })
                var result = post.data
                return [ result ]
            } else {
                Object.keys(items).forEach( (key) => {
                    for(var j = 0; j < post.length; j++)
                        if(post[j]._id === key)
                            post[j].qty = items[key].qty
                })
                return post
            }
        }
     
    }

    return []

    
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

export const calculateSubTotal = items => {
    try {
        var subtotal = 0
        items.forEach( item => {
            subtotal += (item.qty * item.price)
        })
        return subtotal
    } catch {
        return 0
    }
}