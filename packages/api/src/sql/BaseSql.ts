import { FieldPacket, Connection, RowDataPacket } from "mysql2/promise";
import NotImplementedError from "../error/NotImplementedError.ts";
import SqlQueryError from '../error/SqlQueryError.ts'
import { BaseModel } from "../model/BaseModel.ts";
import { ImageAggregRow, ParagraphAggregRow, PersonAggregRow } from "./AggregationsSql.ts";
import { ImageAggreg, ParagraphAggreg, PersonAggreg } from "../model/Aggregations.ts";

export interface BaseRow extends RowDataPacket
{
    ID: number
    CREATED_AT: string | null
    UPDATED_AT: string  | null
}

export default abstract class BaseSql<T extends BaseModel, U extends BaseRow> 
{
    protected db: Connection

    constructor(db: Connection) {
        this.db = db
    }
    
    public async findById(id: number): Promise<T> {throw new NotImplementedError(`Method BaseSql.findByKey(key) must be implemented for class ${this.constructor.name}`)}
    public async findByIds(ids: number[]): Promise<T[]> {throw new NotImplementedError(`Method BaseSql.findByKeys(keys) must be implemented for class ${this.constructor.name}`)}
    public async findAll(): Promise<T[]> {throw new NotImplementedError(`Method BaseSql.findAll() must be implemented for class ${this.constructor.name}`)}

    protected async execute(sql: string, ...params: any[]): Promise<U[]> {
        let [rows]: [U[], FieldPacket[]] = [undefined, undefined]
        try {
            [rows] = await this.db.query<U[]>(sql, [...params])
        }
        catch(err) {
            throw new SqlQueryError(err)
        }

        return rows
    }
    
    protected getSelect(): string {throw new NotImplementedError(`Method BaseSql.getSelect() must be implemented for class ${this.constructor.name}`)}

    /**
     * Puts some lines'forein keys in the relevant arrays
     */
    protected fillForeignKeysFromLines(
        obj: T & (ParagraphAggreg | ImageAggreg | PersonAggreg), 
        lines: (U & (ParagraphAggregRow | ImageAggregRow | PersonAggregRow))[]
    ): T {
        for(let line of lines) {
            this.fillForeignKeys(obj, line)
        }
        return obj
    }

    /**
     * Puts a line's forein keys in the relevant arrays
     */
    protected fillForeignKeys(
        obj: T & (ParagraphAggreg | ImageAggreg | PersonAggreg), 
        line: U & (ParagraphAggregRow | ImageAggregRow | PersonAggregRow)
    ): T {
        if(line.PARAGRAPH_ID != null)
            (obj as ParagraphAggreg).paragraphs.push(line.PARAGRAPH_ID)

        if(line.IMAGE_ID != null)
            (obj as ImageAggreg).images.push(line.IMAGE_ID)

        if(line.PERSON_ID != null)
            (obj as PersonAggreg).persons.push(line.PERSON_ID)

        return obj
    }
}
