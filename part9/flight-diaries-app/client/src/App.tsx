import Header from './components/Header';
import DiaryList from './components/DiaryList';
import NewDiary from './components/NewDiary';
import { useDiaries } from './hooks/useDiaries';

function App() {
  const { diaries, addDiary, errors, setErrors } = useDiaries();

  return (
    <div className="wrapper">
      <Header text="Fligh Diaries App" variant="h1" />
      <NewDiary addDiary={addDiary} error={errors} setError={setErrors} />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;
