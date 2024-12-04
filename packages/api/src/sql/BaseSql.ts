import { FieldPacket, Connection, RowDataPacket } from "mysql2/promise";
import NotImplementedError from "../error/NotImplementedError.ts";
import SqlQueryError from '../error/SqlQueryError.ts'
import { BaseModel } from "../model/BaseModel.ts";
import { ImageAggregRow, ParagraphAggregRow, PersonAggregRow } from "./AggregationsSql.ts";
import { ImageAggreg, ParagraphAggreg, PersonAggreg } from "../model/Aggregations.ts";
import ImplementationError from "../error/ImplementationError.ts";

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
     * Puts some rows'forein keys in the relevant arrays
     */
    protected fillForeignKeysFromLines(
        obj: T | T & (ParagraphAggreg | ImageAggreg | PersonAggreg), 
        rows: (U | ParagraphAggregRow | ImageAggregRow | PersonAggregRow)[]
    ): T | T & (ParagraphAggreg | ImageAggreg | PersonAggreg) {
        for(let row of rows) 
            this.fillForeignKeys(obj, row)
        
        return obj
    }

    /**
     * Puts a row's forein keys in the relevant arrays. Throws an error
     * when a foreign key is present in the row but `obj` does not
     * implement the associated interface.
     */
    protected fillForeignKeys(
        obj: T | T & (ParagraphAggreg | ImageAggreg | PersonAggreg),
        row: U | ParagraphAggregRow | ImageAggregRow | PersonAggregRow
    ): T | T & (ParagraphAggreg | ImageAggreg | PersonAggreg) {

        if(row.PARAGRAPH_ID) {
            if(!(obj as ParagraphAggreg)) 
                throw new ImplementationError(
                    `Object of type ${obj.constructor.name} does not implement ParagraphAggreg (got PARAGRAPH_ID).`
                );
            (obj as ParagraphAggreg).paragraphs.push(row.PARAGRAPH_ID)
        }

        if(row.IMAGE_ID) {
            if(!(obj as ImageAggreg))
                throw new ImplementationError(
                    `Object of type ${obj.constructor.name} does not implement ImageAggreg (got IMAGE_ID).`
                );
            (obj as ImageAggreg).images.push(row.IMAGE_ID)
        }

        if(row.PERSON_ID) {
            if(!(obj as PersonAggreg))
                throw new ImplementationError(
                    `Object of type ${obj.constructor.name} does not implement ImplementationError (got PERSON_ID).`
                );
            (obj as PersonAggreg).persons.push(row.PERSON_ID)
        }

        return obj
    }

    protected fill(rows: U[], createModel: (row: U) => T): T[] {
        const res: T[] = []; let model: T

        // fill the return array with unique entries
        for(let i = 0; i < rows.length; i++) {
            // continue if ID already done (possible with ORDER BY)
            if(i != 0 && rows[i - 1].ID == rows[i].ID) continue
            
            model = createModel(rows[i])

            // get rows with same ID and fill foreign keys
            for(let j = i; j < rows.length && rows[j].ID == rows[i].ID; j++)
                model = this.fillForeignKeys(model, rows[j])
            
            res.push(model)
        }

        return res
    }
}
