const mongoose = require('mongoose')

const MONGO_URL = "mongodb+srv://adamorged:5ALDfw015hZEX5wF@nasacluster.ozg25.mongodb.net/nasa?retryWrites=true&w=majority&appName=NASACluster"


mongoose.connection.once('open', () => {
    console.log('MongoDB connection connected')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

const mongoConnection= async () => {
    await mongoose.connect(MONGO_URL)
    return mongoose;
}

const mongoDisconnection= async () => {
    await mongoose.disconnect(MONGO_URL)
    return mongoose;
}

module.exports = {mongoConnection,mongoDisconnection}
