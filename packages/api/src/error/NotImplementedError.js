export default class NotImplementedError extends Error
{
    constructor(message = '', ...data) {
        super(message, data)

        this.message = 'Not implemented: ' + message
    }
}