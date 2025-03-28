import logo from './logo.svg';
import './App.css';
import Random from './Components/Random';
import Generate from './Components/Generate';

function App() {
  return (
    <div className='app'>
      <h1>
        RANDOM GIFS
      </h1>
      <div className='container'>
        <Random/>
        
      </div>
      <div>
        <Generate/>
      </div>
      
    </div>
  );
}

export default App;
