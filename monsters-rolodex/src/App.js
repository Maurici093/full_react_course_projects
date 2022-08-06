import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';


const App = () => {

  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    console.log('effect fired')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=>response.json())
      .then((users) => setMonsters(users));
  }, [])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);

  }

  const filteredMonsters = monsters.filter((monster) => {
    return monster.name.toLocaleLowerCase().includes(searchField);
  });

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


// class App extends Component {

//   constructor() {
//     super();
    
//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }

//   render() {

//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     return (

//       <div className="App">
//       </div>
//     );
//   }
// }

export default App;
