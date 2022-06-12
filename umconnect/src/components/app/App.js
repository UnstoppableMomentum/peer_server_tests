import logo from '../../logo.svg';
import '../../css/App.css';
import ViewMain from '../views/ViewMain'
import MenuWrap from '../menu/MenuWrap';
import BurgerMenu from 'react-burger-menu';
import classNames from 'classnames';
import '../menu/fonts/font-awesome-4.2.0/css/font-awesome.min.css';
import '../menu/normalize.css';

const state = {
  currentMenu: 'slide',
  side: 'left'
};

export function getItems() {
  let items;
  const qqq = 1;
  //switch (this.props.menus[state.currentMenu].items) {
  switch (qqq) {
    case 1:
      items = [
        <a key="0" href="">
          <i className="fa fa-fw fa-star-o" />
          <span>Favorites</span>
        </a>,
        <a key="1" href="">
          <i className="fa fa-fw fa-bell-o" />
          <span>Alerts</span>
        </a>,
        <a key="2" href="">
          <i className="fa fa-fw fa-envelope-o" />
          <span>Messages</span>
        </a>,
        <a key="3" href="">
          <i className="fa fa-fw fa-comment-o" />
          <span>Comments</span>
        </a>,
        <a key="4" href="">
          <i className="fa fa-fw fa-bar-chart-o" />
          <span>Analytics</span>
        </a>,
        <a key="5" href="">
          <i className="fa fa-fw fa-newspaper-o" />
          <span>Reading List</span>
        </a>
      ];
      break;
    case 2:
      items = [
        <h2 key="0">
          <i className="fa fa-fw fa-inbox fa-2x" />
          <span>Sidebar</span>
        </h2>,
        <a key="1" href="">
          <i className="fa fa-fw fa-database" />
          <span>Data Management</span>
        </a>,
        <a key="2" href="">
          <i className="fa fa-fw fa-map-marker" />
          <span>Location</span>
        </a>,
        <a key="3" href="">
          <i className="fa fa-fw fa-mortar-board" />
          <span>Study</span>
        </a>,
        <a key="4" href="">
          <i className="fa fa-fw fa-picture-o" />
          <span>Collections</span>
        </a>,
        <a key="5" href="">
          <i className="fa fa-fw fa-money" />
          <span>Credits</span>
        </a>
      ];
  }

  return items;
}

function getMenu() {
  const Menu = BurgerMenu[state.currentMenu];
  return (
    <MenuWrap wait={20} side={state.side}>
      <Menu
        id={state.currentMenu}
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        right={state.side === 'right'}
      >
        {getItems()}
      </Menu>
    </MenuWrap>
  );
}

function App() {

  return (
    <div id="outer-container" style={{ height: '100%' }}>
      {getMenu()}
      <main id="page-wrap">
        <h1>
          <a href="https://github.com/negomi/react-burger-menu">
            react-burger-menu
          </a>
        </h1>
        <a
          className={classNames({
            'side-button': true,
            left: true,
            active: state.side === 'left'
          })}
        
        >
          Left
        </a>
        <a
          className={classNames({
            'side-button': true,
            right: true,
            active: state.side === 'right'
          })}
        
        >
          Right
        </a>
        <h2 className="description">
          An off-canvas sidebar React component with a collection of effects
          and styles using CSS transitions and SVG path animations.
        </h2>
        
        Inspired by{' '}
        <a href="https://github.com/codrops/OffCanvasMenuEffects">
          Off-Canvas Menu Effects
        </a>{' '}
        and{' '}
        <a href="https://github.com/codrops/SidebarTransitions">
          Sidebar Transitions
        </a>{' '}
        by Codrops
      </main>
    </div>
  );


  //   return (
//       <div id="outer-container" style={{ height: '100%' }}>
//  <main id="page-wrap">
// {/* <div className="App"> */}
//       {getMenu()}
//       {/* <ViewMain/> */}
//       {/* </div> */}
//       </main>
//     </div>

//   );
}

export default App;
