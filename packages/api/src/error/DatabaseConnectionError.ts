export default class DatabaseConnectionError extends Error
{
    constructor(message: string, options?: ErrorOptions) {
        super(message, options)

        this.message = 'Could not connect to database: ' + message
    }
}
