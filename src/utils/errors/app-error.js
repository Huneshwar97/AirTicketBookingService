class AppError extends Error {
    constructor(
        name,
        messgae,
        explanation,
        statusCode
    ){
        this.name = name;
        this.message= message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = AppError