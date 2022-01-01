import DisplayArea from "./components/DisplayArea/DisplayArea";
import SelectionMenu from "./components/SelectionMenu/SelectionMenu";
import { Context } from "./context";
import "./App.scss";
import "reactjs-popup/dist/index.css";

const App = (props) => {
  return (
    <Context {...props}>
      <div className="App">
        <SelectionMenu />
        <DisplayArea />
      </div>
    </Context>
  );
};

export default App;
