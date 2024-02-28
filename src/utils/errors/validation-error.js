const { StatusCode } = require('http-status-code')
class ValidationError extends Error {
    constructor(error)
    {
        let explanation = [];
        error.errors.foreach((err)=>{
            explanation.push(err.message);
        })
        this.name = 'ValidationError';
        this.message = 'Not able to validate the data sent in request';
        this.explanation = explanation;
        this.statusCode = StatusCode.BAD_REQUEST;
    }
} 

module.exports = ValidationError