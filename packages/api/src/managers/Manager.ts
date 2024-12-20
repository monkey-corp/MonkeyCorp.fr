import BaseSql from "../sql/BaseSql.ts";

export default class Manager<T extends BaseSql<any,any>>
{
    private model: T

    public constructor( model: T ) { this.model = model }

    // private async resolve(req: any, res: any, callback: (req: any, res: any) => Promise<void>) {
    private async resolve(res: any, callback: () => Promise<void>) {
        try {
            callback()
        } catch(err) {
            res.status(400).json({error: err})
        }
    }

    public async findById(req: any, res: any) {
        this.resolve(res, async () => {
            const result = await this.model.findById(req.params.id)
            res.status(200).json(result)
        })
        res.send()
    }
    public async findByIds(req: any, res: any) {
        this.resolve(res, async () => {
            const result = await this.model.findByIds(req.body.ids)
            res.status(200).json(result)
        })
        res.send()
    }
    public async findAll(req: any, res: any) {
        this.resolve(res, async () => {
            const result = await this.model.findAll()
            res.status(200).json(result)
        })
        res.send()
    }
}
