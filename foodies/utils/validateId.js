import { ObjectId } from "mongodb"

export default function validateObjectId (id) {
    if( ObjectId.isValid(id) ) {
        if( (String)(new ObjectId(id) === id) )
            return true
        return false
    }
    return false
}