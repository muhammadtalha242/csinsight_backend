import { Request, Response } from 'express';
import authors from '../services/authors';
import { PagedParameters, QueryFilters, TopKParameters } from '../interfaces/types';

export default () => {
    const authorService = authors();
    return {
        getAuthorsYear: async (req: Request, res: Response) => {
            const data = await authorService.getAuthorsYears(req, res);
            res.json(data);
        },
        getAuthorsInfo: async (req: Request<{}, {}, {}, QueryFilters & PagedParameters>, res: Response) => {
            const data = await authorService.getAuthorsInfo(req, res);
            res.json(data);
        },
        getPapersTopk: async (req: Request<{}, {}, {}, QueryFilters & TopKParameters>,
            res: Response) => {
            const data = await authorService.getPaperTopk(req, res);
            res.json(data);
        },
        getPapersQuartiles: async (req: Request<{}, {}, {}, QueryFilters>,
            res: Response) => {
            const data = await authorService.getPaperQuartiles(req, res);
            res.json(data);
        },
        addAuthors: async (req: Request, res: Response) => {
            const data = await authorService.addAuthors(req, res);
            res.json(data);
        },
    }

}
