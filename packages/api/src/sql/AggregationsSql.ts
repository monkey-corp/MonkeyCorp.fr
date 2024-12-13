import { RowDataPacket } from "mysql2/promise";

export interface ParagraphAggregRow extends RowDataPacket
{
    PARAGRAPH_ID: number
}
export interface ImageAggregRow extends RowDataPacket
{
    IMAGE_ID: number
}
export interface PersonAggregRow extends RowDataPacket
{
    PERSON_ID: number
}
