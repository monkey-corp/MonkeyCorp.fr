import { Connection } from "mysql2/promise";
import BaseSql from "../sql/BaseSql.ts";
import Manager from "./Manager.ts";
import SqlConnection from "../SqlConnection.ts";

export default abstract class ManagerFactory
{
    public static async create<T extends BaseSql<any,any>>(modelClass: new(db:Connection) => T): Promise<Manager<T>> {
        const model = new modelClass(await SqlConnection.get())
        return new Manager<T>(model)
    }
}
