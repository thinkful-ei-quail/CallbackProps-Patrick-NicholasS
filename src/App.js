import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';

class App extends Component {
  static defaultProps = {
  };

  state = {
    store: STORE
  }

  handleAddClick = (listId) => {
    const card = this.newRandomCard();
    {store} = this.sate
    this.state.store.allCards.push(card);
    const list = this.state.store.lists.filter(list => list.id === listId);
  }

  handleDeleteClick = (id) => {
    let {lists} = this.state;

    lists = lists.map(list => {
      return list.filter(card => {
        return card.id !== id;
      })
    });

    this.setState({lists: lists});
  }

  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
