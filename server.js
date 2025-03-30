//*TO START SERVER => npm start

require('dotenv').config();

const app = require('./src/app');
const { connectDB, sequelize } = require('./src/config/database');

const PORT = process.env.PORT;

connectDB();

sequelize.sync().then(() => {
    console.log('DB SYNCHRONIZED.');
}).catch(error => {
    console.error('ERROR SYCHRONIZING DB:', error);
});

//LISTENING
app.listen(PORT,()=>{
    console.log(`SERVER LISTENING ON PORT ${PORT}`)
})