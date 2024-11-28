export default class DatabaseConnectionError extends Error
{
    constructor(message = '', ...data) {
        super(message, data)

        this.message = 'Could not connect to database: ' + message
    }
}
