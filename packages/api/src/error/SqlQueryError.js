export default class SqlQueryError extends Error
{
    constructor(message = '', ...data) {
        super(message, data)

        this.message = 'Error in SQL query: ' + message
    }
}