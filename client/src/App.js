import React from 'react';
import AddBar from './AddBar';
import "./App.css";
import ListsView from './ListsView';
import Sidebar from './Sidebar';

class App extends React.Component {
  constructor() {
    super();

    // Binding methods
    this.addNewJirafItem = this.addNewJirafItem.bind(this);
    this.handleLabelSelect = this.handleLabelSelect.bind(this);
    this.filterByLabel = this.filterByLabel.bind(this);

    this.loaded = false;
  }

  // Filters the jiraf notes by their label (based on the selected label in the sidebar)
  filterByLabel(label)
  {
    const jirafs = [];
    const allJirafs = this.state.jirafItems;
    allJirafs.forEach(element => {
      if(element.labels.includes(label))
      {
        jirafs.push(element);
      }
    });

    this.setState({selectedJirafs: jirafs});
  }

  // Adds a new item to the jiraf item list
  addNewJirafItem(title, message, color="orange")
  {
    // Set state, labels, and then filter by label
    const labels = ["All"];
    if(this.state.currentLabel !== "All")
    {
      labels.push(this.state.currentLabel);
    }

    const tmpJirafItems = this.state.jirafItems;
    const newJiraf = {title:title, message:message, labels:labels, color: color};
    tmpJirafItems.unshift(newJiraf);

    this.setState({jirafItems: tmpJirafItems});

    this.handleLabelSelect(this.state.currentLabel);
  }

  // handles the selection of a label in the sidebar (passed to sidebar component)
  handleLabelSelect(label)
  {
    const labels = this.state.labels;
    labels.forEach(element => {
      element.selected = false;
      if(element.label === label)
      {
        element.selected = true;
      }
    });
    this.setState({labels: labels, currentLabel:label});
    this.filterByLabel(label);
  }

  componentDidMount() {
    fetch("/data")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                jirafItems: json.jirafItems,
                selectedJirafs: json.jirafItems,
                labels: json.labels,
                currentLabel: json.currentLabel
            });
            this.loaded = true;
        })
}

  // Main rendering for the app
  render() {
    if(!this.loaded)
    {
      return (<div>Not loaded yet</div>);
    }

    return (
      <div className="App">
        <Sidebar labels={this.state.labels} labelChangeHandler={this.handleLabelSelect}/>

        <div className='main'>
          <AddBar newJirafMethod={this.addNewJirafItem} />
          <ListsView jirafItems={this.state.selectedJirafs}/>
        </div>

        <dialog class="createDialog">
          <h1>Are you sure</h1>
          <button>Yes</button>
          <button>No</button>
        </dialog>
      </div>
    );
  }
}

export default App;