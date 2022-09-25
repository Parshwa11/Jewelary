const app = require("./app")
const dotenv = require("dotenv")
const connectDB = require("./Config/database")
    
dotenv.config({path : "BackEnd/Config/config.env"
})

connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port number : ${process.env.PORT} `)
})
