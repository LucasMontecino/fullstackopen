import { Route, Routes } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommend from './components/Recommend';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Authors />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={<Books />} />
      <Route path="/add-book" element={<NewBook />} />
      <Route path="/recommend" element={<Recommend />} />
    </Routes>
  );
};

export default App;
