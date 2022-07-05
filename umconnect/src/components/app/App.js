import DialogContainer from '../dialogs/DialogContainer'
import ViewMain from '../views/ViewMain'
import SideBar from "../menu/sidebar";

import '../../css/App.css';
import '../../css/Dialogs.css';
import '../../css/Menu.css';

function App() {
  return (
    <div id="App" className="App">
      <SideBar pageWrapId={"App"} outerContainerId={"App"}/>

      {/* <DialogContainer className="dialog-container"/> */}

      <div id="page-wrap">
      <DialogContainer className="dialog-container"/>
      <ViewMain/>
      </div>
    </div>
  );
}

export default App;
