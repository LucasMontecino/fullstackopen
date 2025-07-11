export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveEntry = Omit<DiaryEntry, 'comment'>;

export interface IHeader {
  text: string;
  variant: 'h1' | 'h2' | 'h3';
}

export interface IDiaryInput {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'date';
}

export interface IButton {
  label: string;
  type: 'button' | 'submit';
}

export interface INewDiary {
  addDiary: (entry: NewDiaryEntry) => void;
  error: string;
  setError: (value: string) => void;
}

export interface IDiaryRadioButtonGroup<T> {
  title: string;
  options: Array<{ value: T; label: string }>;
  name: string;
  selectedValue: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IDiaryRadioButton<T> {
  name: string;
  value: T;
  label: string;
  selectedValue: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IDiaryForm {
  newDiary: NewDiaryEntry;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
}

export interface IDiaryStats {
  label: string;
  stat: Weather | Visibility;
}
