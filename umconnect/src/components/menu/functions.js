export function getItems() {
    let items;
    const qqq = 1;
    //switch (this.props.menus[this.state.currentMenu].items) {
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

  