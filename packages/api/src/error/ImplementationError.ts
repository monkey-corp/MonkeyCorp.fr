export default class ImplementationError extends Error
{
    constructor(message: string, options?: ErrorOptions) {
        super(message, options)

        this.message = `There is an error in the implementation: ${message}`

        Object.setPrototypeOf(this, ImplementationError.prototype)
    }
}
