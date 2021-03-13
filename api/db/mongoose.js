const mongoose = require("mongoose");
var { getDbConnectionStr } = require('../config');


module.exports = {
    connectToDb: (successMsg = "connected succefully to the DB", errMsg = "Can't connect to MongoDB") => {
        mongoose.connect(getDbConnectionStr(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndexes: true,
            useFindAndModify: false,

        }).then(() => {
            console.log(successMsg);
        }).catch(error => {
            console.log(`${errMsg} - ${error}`);
        })
    }
};
