export default class SqlQueryError extends Error
{
    constructor(message: string, options?: ErrorOptions) {
        super(message, options)

        this.message = 'Error in SQL query: ' + message
    }
}
