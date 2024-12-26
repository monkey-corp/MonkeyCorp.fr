import mysql, { Connection, ConnectionOptions } from "mysql2/promise";
import DatabaseConnectionError from "./error/DatabaseConnectionError.ts";

export default abstract class SqlConnection
{
    private static db?: Connection
    private static options: ConnectionOptions = {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }

    public static async get(): Promise<Connection> {
        if(!this.db)
            try {
                this.db = await mysql.createConnection(this.options)
            }
            catch(err) {
                throw new DatabaseConnectionError(err.message)
            }
        
        return this.db
    } 
    public static close() {
        this.db.end()
        this.db = null
    }

    public static setOptions(options: ConnectionOptions) {
        this.options = options
    }
}
