import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Calculator from './pages/Calculator';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="calculator/*" element={<Calculator />}>
          <Route path=":estimateType" element={<Calculator />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "4rem" , textAlign: "center"}}>
              <h2>Sorry, This Page Does Not Exist.</h2>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
