export default class IllegalArgumentError extends Error
{
    constructor(message: string, options?: ErrorOptions) {
        super(message, options)

        this.message = 'Illegal argument: ' + message
    }
}
