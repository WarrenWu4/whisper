import { DB_URI } from "$env/static/private"
import { json } from "@sveltejs/kit"
import { MongoClient } from "mongodb"

// ! add api key in the future to secure secrets
export const GET = async() => {

    // connect to db
    const client = await new MongoClient(DB_URI).connect()
    
    // get secrets collection
    const collection = client.db("whisper_main_db").collection("secrets")
    
    // get random document
    const documents = await collection.aggregate([{ $sample: {size: 1}}]).toArray()

    // return data
    return json(documents)
}

// ! add api key in the future to secure secrets
export const POST = async({request}) => {

    // get user secret
    const { text } = await request.json()
    
    // connect to db
    const client = await new MongoClient(DB_URI).connect()

    // get secrests collection
    const collection = client.db("whisper_main_db").collection("secrets")

    // insert document
    const result = await collection.insertOne({
        secret: text
    })

    return json("success", {status: 200})
}