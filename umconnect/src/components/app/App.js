import ViewMain from '../views/ViewMain'
import SideBar from "../menu/sidebar";

import '../../css/App.css';
import '../../css/Menu.css';

function App() {
  return (
    <div id="App" className="App">
      {<SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />}
      <div id="page-wrap">
        <ViewMain/>
      </div>
    </div>
  );
}

export default App;
