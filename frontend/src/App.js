import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <h1>User Registration Portal</h1>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
