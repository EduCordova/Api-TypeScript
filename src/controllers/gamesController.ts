import {Request, Response} from 'express';
import db from '../database';

class GamesController {
 public index(req: Request, res: Response) {
    db.query('SELECT * FROM games').then(r => {
      res.json({'data':r});
    });
  }
}

export const gamesController = new GamesController();