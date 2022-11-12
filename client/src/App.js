import React from 'react';
import AddBar from './AddBar';
import "./App.css";
import ListsView from './ListsView';
import Sidebar from './Sidebar';
import { v1 as uuid } from 'uuid';

class App extends React.Component {
  constructor() {
    super();

    // Binding methods
    this.addNewJirafItem = this.addNewJirafItem.bind(this);
    this.handleLabelSelect = this.handleLabelSelect.bind(this);
    this.filterByLabel = this.filterByLabel.bind(this);
    this.handleAddLabel = this.handleAddLabel.bind(this);
    this.editJiraf = this.editJiraf.bind(this);

    this.loaded = false;
  }

  generateId(name)
  {
    return name + uuid();
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

    const id = this.generateId("sam");

    const tmpJirafItems = this.state.jirafItems;
    const newJiraf = {title:title, message:message, labels:labels, color: color, id:id};
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

  handleAddLabel(label)
  {
    this.setState({labels: [...this.state.labels, {label: label, selected: false}]});
  }

  editJiraf(jirafItem, optionDelete)
  {
    const jirafItems = this.state.jirafItems;
    var i = 0;
    while(jirafItems[i].id !== jirafItem.id)
    {
      i++;
      if(i >= jirafItems.length) return;
    }

    if(optionDelete)
    {
      jirafItems.splice(i, 1); // 2nd parameter means remove one item only
    }
    else
    {
      jirafItems[i] = jirafItem;
    }
    this.setState({jirafItems: jirafItems});
    this.handleLabelSelect(this.state.currentLabel);
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
        <Sidebar labels={this.state.labels} labelChangeHandler={this.handleLabelSelect} labelAddHandler={this.handleAddLabel}/>

        <div className='main'>
          <AddBar newJirafMethod={this.addNewJirafItem} />
          <ListsView jirafItems={this.state.selectedJirafs} editCallback={this.editJiraf}/>
        </div>
      </div>
    );
  }
}

export default App;