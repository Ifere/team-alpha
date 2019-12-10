const mongoose = require("mongoose")
const url = "mongodb://localhost:27017/team-alpha"

module.exports.connectMongodb = () => {
    mongoose.Promise = global.Promise;
    return mongoose.connect(process.env.mongo_url || url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log(err)
            console.log(new Error('unable to connect to mongodb'))
        };
        console.log('the mongodb database %s is running on instance  %s', 'team-alpha', url);
    });
};