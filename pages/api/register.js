import clientPromise from "../../utils/mongodb";
import { hashIt } from "../../utils/hashpassword";

export default async function handler(req, res) {

    if(req.method == "POST") {

        const client = await clientPromise;
        const db = client.db("test")

        const result1 = await db.collection("users").findOne({email: req.body.email})
        if(result1)
            return res.status(409).send("account registered")
        const result2 = await db.collection("users").findOne({email: req.body.email})
        if(result2)
            return res.status(409).send("account registered")

        const hashPassword = await hashIt(req.body.password)
        
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        }

        await db.collection("users").insertOne(user)

        return res.status(200).send("ok")
    }

    return res.status(400).send( {status: 400, error: `${req.method} are not allowed at the moment`})
}