import React from 'react';
import AddBar from './AddBar';
import "./App.css";
import ListsView from './ListsView';
import Sidebar from './Sidebar';

class App extends React.Component {
  constructor() {
    super();

    var jiraf1 = {title: "Standup update", message: "This is this morning's update"};
    var jiraf2 = {title: "Lunch reminder", message: "Your lunch today is pork chops and potatoes"};

    var labels = [{label: "Important", selected: false}, {label: "To do list", selected: true}, {label: "Today", selected: false}, {label: "School", selected: false}, {label: "Work", selected: false}];

    this.state = { jirafItems: [jiraf1, jiraf2], labels: labels, currentNote: "Today"};
    this.addNewJirafItem = this.addNewJirafItem.bind(this);
    this.handleLabelSelect = this.handleLabelSelect.bind(this);
  }

  addNewJirafItem(title, message)
  {
    this.setState({jirafItems: [...this.state.jirafItems, {title:title, message:message}]});
  }

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
    this.setState({labels: labels});
  }

  render() {
    return (
      <div className="App">
        <Sidebar labels={this.state.labels} labelChangeHandler={this.handleLabelSelect}/>

        <div className='main'>
          <AddBar newJirafMethod={this.addNewJirafItem} />
          <ListsView jirafItems={this.state.jirafItems}/>
          <button onClick={this.addNewState}>Add new State</button>
        </div>
      </div>
    );
  }
}

export default App;