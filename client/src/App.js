import logo from './logo.svg';
import React from 'react'
//import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "software",
      associations: null
    };
  }

  //const [word, setWord] = React.useState('software');
  //const [associations, setAssociations] = React.useState(null);

  getAssociations = () => {
    console.log("This part ran")
    fetch('/api/associations/' + this.state.word)
      .then(result => result.json())
      .then(body => this.setState({associations: body}));
  };
  render(){
  return (
    <div className="app">
      <h1>Word Associations Map</h1>
      <input value= {this.state.word} onChange = {e => this.setState({word:e.target.value})} />
      <button onClick={this.getAssociations}>Find Associations</button>
      {this.state.associations && (
        Object.keys(this.state.associations).length === 0
          ? <p>No results</p>
          : <div>
            {Object.entries(this.state.associations).map(([association, score]) => (
              <span style={{ fontSize: Math.pow(score, 2) / 200 }}>
                {association}
                {' '}
              </span>
            ))}
          </div>
      )}
    </div>
  )};
}

export default App;
