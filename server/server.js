import config from './config/config.js'
import app from './express.js'

app.listen(config.port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`Server is running on the port ${config.port}`)
})