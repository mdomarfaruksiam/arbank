const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB Connected')
    } catch (error) {
        console.error('========== FULL ERROR ==========')
        console.error(error)
        console.error('Name:', error.name)
        console.error('Message:', error.message)
        console.error('Reason:', error.reason)
        console.error('Cause:', error.cause)
        console.error('================================')
    }
}

module.exports = dbConnection