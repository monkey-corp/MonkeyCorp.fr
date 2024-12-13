export default class NotImplementedError extends Error
{
    constructor(message: string, options?: ErrorOptions) {
        super(message, options)

        this.message = `Not implemented: ${message}`

        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}
