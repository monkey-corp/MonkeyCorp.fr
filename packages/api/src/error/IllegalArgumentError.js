export default class IllegalArgumentError extends Error
{
    constructor(message = '', ...data) {
        super(message, data)

        this.message = 'Illegal argument: ' + message
    }
}