//here you can put generic functions which be available where ever the functions module is required.

var Return = function (success, message, data) {
    var returnObj = {
        success,
        message
    };
    if (typeof data !== 'undefined') returnObj.data = data;
    return returnObj;
}

module.exports = {
    return: Return,
}
