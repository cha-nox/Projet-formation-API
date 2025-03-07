import { Request, Response, RequestHandler } from 'express';

export const sendResponse: RequestHandler = (req: Request, res: Response) => {
    res.json(res.locals.data_content);
};