import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';

function omit(obj, keyToOmit) {
  let {[keyToOmit]: _, ...rest} = obj;
  return rest;
}

class App extends Component {

  state = {
    store: STORE
  }

  handleAddClick = (listId) => {
    const card = this.newRandomCard();
    const {lists,allCards} = this.state.store;
    allCards.push(card);
    const list = lists.filter(list => list.id === listId);
    list.cardIds.push(card.id);
  }

  

  handleDeleteClick = (cardId) => {
    let {lists,allCards} = this.state.store;
    
    const newLists = lists.map(list => {
      return {
        ...lists,
        cardIds: list.cardIds.filter(id =>id !== cardId)
      }
    });
    const data = omit(allCards,cardId)

    this.setState({store:{lists:newLists,allCards:data}})
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
            <List handleAddClick={(id) => this.handleAddClick}
            handleDeleteClick={(id) => this.handleDeleteClick} 
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
