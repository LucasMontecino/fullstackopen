import express, { NextFunction, Request, Response } from 'express';
import diaryService from '../services/diaries';
import {
  NonSensitiveEntry,
  DiaryEntry,
  MyError,
  NewDiaryEntry,
} from '../types';
import { newDiaryParser } from '../middlewares';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveEntry[]>) => {
  const diaries = diaryService.getNonSensitiveEntries();
  res.send(diaries);
});

router.get(
  '/:id',
  (req, res: Response<DiaryEntry | MyError>, next: NextFunction) => {
    const diary: DiaryEntry | undefined = diaryService.findEntryById(
      Number(req.params.id)
    );
    try {
      if (diary) {
        res.status(200).json(diary);
        return;
      } else {
        throw new Error('missing id or not entry found');
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.post(
  '/',
  newDiaryParser,
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry | MyError>,
    next: NextFunction
  ) => {
    try {
      const addedEntry: DiaryEntry = diaryService.addDiary(req.body);

      res.status(201).json(addedEntry);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export default router;
