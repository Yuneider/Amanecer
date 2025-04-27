//*TO START SERVER => npm start

require('dotenv').config()

const app = require('./src/app')
const { connectDB, sequelize } = require('./src/config/database')

const PORT = process.env.PORT

connectDB()

sequelize.sync().then(() => {
    console.log('✅ DB sychronized.')
}).catch(error => {
    console.error('❌Error sychronizing DB: ', error)
})

//LISTENING
app.listen(PORT, () => {
    console.log('✅ Server listening on port ' + PORT)
})