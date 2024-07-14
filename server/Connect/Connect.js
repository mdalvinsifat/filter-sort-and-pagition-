
const mongoose = require("mongoose")


const ConnectDB = async() =>{
    try {
        await mongoose.connect(process.env.CONNECT)
        console.log("CONNECT DB ")
        } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectDB