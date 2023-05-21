import { Request, Response } from 'express';
import papers from '../services/papers';
import { PagedParameters, QueryFilters, TopKParameters } from '../interfaces/types';

export default () => {
    const paperService = papers();
    return {
        getPapers: async (req: Request, res: Response) => {
            const data = await paperService.getPapers(req, res);
            res.json(data);
        },
        getPapersInfo: async (req: Request<{}, {}, {}, QueryFilters & PagedParameters>, res: Response) => {
            const data = await paperService.getPaperInfo(req, res);
            res.json(data);
        },
        getPapersTopk: async (req: Request<{}, {}, {}, QueryFilters & TopKParameters>,
            res: Response) => {
            const data = await paperService.getPaperTopk(req, res);
            res.json(data);
        },
        getPapersQuartiles: async (req: Request<{}, {}, {}, QueryFilters>,
            res: Response) => {
            const data = await paperService.getPaperQuartiles(req, res);
            res.json(data);
        }
    }

}
