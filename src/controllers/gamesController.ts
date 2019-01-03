import {Request, Response} from 'express';
import pool from '../database';

class GamesController {
  public async list(req: Request, res: Response) {
    const games = await pool.query('SELECT * FROM games');
    res.json(games);
  }

  public async getOne(req:Request, res:Response) {
    const id = req.params.id;
    const data = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
    if (data.length > 0) {
      return res.json(data[0]);
    }
    res.status(404).json({'text': 'EL juego no existe'});
  } 

  public async create(req:Request, res:Response) {
    await pool.query('INSERT INTO games set ?', [req.body]);
    res.json({
      message: 'Game Creado'
    });
  }
  public async delete(req:Request, res:Response) {
    const id = req.params.id;
    await pool.query('DELETE FROM games WHERE id = ?', [id])
    res.json({message: 'Game Eliminado'});
  }
  public async update(req:Request, res:Response) {
    const id = req.params.id;
    await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
    res.json({message: 'Game Actualizado'});
  }
}

export const gamesController = new GamesController();