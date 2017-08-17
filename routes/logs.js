var express = require('express'),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    models = require('../modules/Models'),
    Log = models.Log,
    LocalException = models.LocalException,
    Client = require('node-rest-client').Client,
    restClient = new Client(),
    router = express.Router(),
    functions = require('../modules/functions'),

function saveLocalException(exception) {
    var data = new LocalException({
        exceptionMessage: exception.message,
        exception:exception
    })
    data.save().then(doc=>{
        console.log('Exception Saved!',doc)
    }).catch(e=>{
        console.log('Failed to log exception',e)
    })
}

router.get('/logs', (req, res) => {
    Log.find().limit(50).sort('-_id').then(logs => {
        if (logs.length > 0) {
            res.json(functions.return(true, "LOGS FOUND.", logs))
        } else {
            res.json(functions.return(false, "LOGS NOT FOUND."))
        }
    }).catch(error => {
        saveLocalException(error)
        res.json(functions.return(false, "ERROR GETTING LOGS."))
    })
})

router.get('/logs/:logId', (req, res) => {
    var logId = req.params.logId;
    Log.findOne({ '_id': logId }).then(log => {
        if (log) {
            res.json(functions.return(true, "LOG FOUND.", log))
        } else {
            res.json(functions.return(false, "LOG NOT FOUND."))
        }
    }).catch(error => {
        saveLocalException(error)
        res.json(functions.return(false, "ERROR GETTING LOG."))
    })
})

router.post('/logs', jsonParser,(req, res) => {
    if (req.body.errorMessage && req.body.error && req.body.platform) {
        var data = {
            errorMessage: req.body.errorMessage,
            error: req.body.error,
            user_id: req.app.get(req.app.get('user_type') + "_id"),
            platform: req.body.platform,
        }
        if (req.body.extraInformation) {
            data.extraInformation = req.body.extraInformation
        }

        var newLog = new Log(data);
        newLog.save().then(savedLog => {
            if(savedLog){
                res.json(functions.return(true, "LOG CREATED.", savedLog))
            }else{
                res.json(functions.return(true, "LOG NOT CREATED."))
            }
        }).catch(e => {
            res.json(functions.return(false,"FAILED TO SAVE LOG."))
            saveLocalException(e)
        })
    } else {
        res.json(functions.return(false, "MISSING OR INVALID PARAMETERS."))
    }

})


module.exports = router;

