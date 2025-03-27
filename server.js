//*TO START SERVER => npm start

require('dotenv').config();

const app = require('./src/app');
const PORT = process.env.PORT;

//LISTENING
app.listen(PORT,()=>{
    console.log(`SERVER LISTENING ON PORT ${PORT}`)
})