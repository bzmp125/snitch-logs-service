var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemas = {
    logSchema: new Schema({
        errorMessage: { type: String, required: true },
        error: { type: String, default: '' },
        timestamp: { type: Date, default: Date.now },
        user_id: { type: String}, // or however you'd want it
        platform: { type: String, required: true },
        extraInformation: { type: String, default: '' },
    }),
    localExceptionSchema: new Schema({
        exceptionMessage: { type: String, required: true },
        exception: { type: String, default: '' },
        timestamp: { type: Date, default: Date.now },
        extraInformation: { type: String, default: '' }
    })

}

module.exports = {
    schemas,
    Log: mongoose.model('Log', schemas.logSchema),
    LocalException: mongoose.model('LocalException', schemas.localExceptionSchema),
}
