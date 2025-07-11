import { useState, type SyntheticEvent } from 'react';
import {
  Visibility,
  Weather,
  type IDiaryForm,
  type NewDiaryEntry,
} from '../types';

export const useDiaryForm = (
  addDiary: IDiaryForm['addDiary'],
  setError: IDiaryForm['setError']
) => {
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setNewDiary((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    addDiary(newDiary);
    setNewDiary({
      date: '',
      weather: Weather['Sunny'],
      visibility: Visibility['Good'],
      comment: '',
    });
  };

  return {
    newDiary,

    handleChange,
    handleSubmit,
  };
};
