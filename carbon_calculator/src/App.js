import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import SavedEstimates from './pages/SavedEstimates'
import { EstimatesProvider } from './components/EstimatesContext';

function App() {

  return (
    <EstimatesProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="calculator/*" element={<Calculator/>}>
            <Route path=":estimateType" element={<Calculator/>} />
          </Route>
          <Route path="estimates" element={<SavedEstimates/>}/>
          <Route
            path="*"
            element={
              <main style={{padding: "4rem" , textAlign: "center"}}>
                <h2>Sorry, This Page Does Not Exist.</h2>
              </main>
            }
          />
        </Routes>
      </div>
    </EstimatesProvider>
  );
}

export default App;
