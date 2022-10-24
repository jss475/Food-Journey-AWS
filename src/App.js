import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Restaurant } from './models';

function App() {
  
  const create = async () => {
    
    await DataStore.save(
      new Restaurant({
        "name": "Hyun",
        "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F10%2FHYUN-interior-FT-BLOG0919.jpg",
        "location": "10 E. 33rd St., New York, 10016, United States",
        "phone": "",
        "menulink": "https://uploads-ssl.webflow.com/5ff02063f528ecac6a836157/62582c20be131e064fe0ac98_HYUN_7Courses_2022_0414_BG.pdf"
      })
    )
  }

  const query = async () =>{
    const resList = await DataStore.query(Restaurant)
    console.log(resList)
  }
  

  useEffect(()=> {
    // DataStore.delete(Restaurant, Predicates.ALL)
    // create()
  },[])

  useEffect(()=> {
    query()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
