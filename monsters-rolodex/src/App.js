import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';


const App = () => {

  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonster] = useState(monsters);

  useEffect(() => {
    console.log('effect fired')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=>response.json())
      .then((users) => setMonsters(users));
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonster(newFilteredMonsters);
  },[monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);

  }

  return(
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      
      <SearchBox 
        onChangeHandler={onSearchChange} 
        placeholder='search monster' 
        className='monster-search-box'
      />
      <CardList monsters={filteredMonsters}/>
    </div>
  );
}

export default App;
