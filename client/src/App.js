import React from 'react';
import AddBar from './AddBar';
import "./App.css";
import ListsView from './ListsView';
import Sidebar from './Sidebar';

class App extends React.Component {
  constructor() {
    super();

    // State initialization
    var jiraf1 = {title: "Standup update", message: "This is this morning's update", labels:["All", "Important"]};
    var jiraf2 = {title: "Lunch reminder", message: "Your lunch today is pork chops and potatoes", labels:["All"]};

    var labels = [{label: "All", selected: true}, {label: "Important", selected: false}, {label: "To do list", selected: false}, {label: "Today", selected: false}, {label: "School", selected: false}, {label: "Work", selected: false}];

    this.state = { jirafItems: [jiraf1, jiraf2], selectedJirafs: [jiraf1, jiraf2], labels: labels, currentLabel: "All"};

    // Binding methods
    this.addNewJirafItem = this.addNewJirafItem.bind(this);
    this.handleLabelSelect = this.handleLabelSelect.bind(this);
    this.filterByLabel = this.filterByLabel.bind(this);
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
  addNewJirafItem(title, message)
  {
    // Set state, labels, and then filter by label
    const labels = ["All"];
    if(this.state.currentLabel != "All")
    {
      labels.push(this.state.currentLabel);
    }

    this.setState({jirafItems: [...this.state.jirafItems, {title:title, message:message, labels:labels}], selectedJirafs: [...this.state.selectedJirafs, {title:title, message:message, labels}]});
  }

  // handles the selection of a label in the sidebar (passed to sidebar component)
  handleLabelSelect(label)
  {
    const labels = this.state.labels;
    labels.forEach(element => {
      element.selected = false;
      if(element.label == label)
      {
        element.selected = true;
      }
    });
    this.setState({labels: labels, currentLabel:label});
    console.log("Set state to " + label);
    this.filterByLabel(label);
  }

  // Main rendering for the app
  render() {
    return (
      <div className="App">
        <Sidebar labels={this.state.labels} labelChangeHandler={this.handleLabelSelect}/>

        <div className='main'>
          <AddBar newJirafMethod={this.addNewJirafItem} />
          <ListsView jirafItems={this.state.selectedJirafs}/>
        </div>
      </div>
    );
  }
}

export default App;