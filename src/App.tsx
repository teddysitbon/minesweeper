import Cell from './Cell';
import './App.scss';

function App() {
  function handleClickCell(): void {
    console.log("click");
  }

  return (
    <div className="App">
      <Cell onClick={handleClickCell}/>
    </div>
  );
}

export default App;
