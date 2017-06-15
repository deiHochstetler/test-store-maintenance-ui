import React, { Component } from 'react';
import './App.css';
import toastr from 'toastr';
import 'ux-styleguide/dist/ux-styleguide.min.css';
import Controls from './Controls';
import Header from './Header';

toastr.options = {
  positionClass: 'toast-top-center'
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      prodStores: [],
      testStores: [],
      singleStore: {},
      singleProdStore: {},
      viewTestStore: '',
      viewProdStore: '',
      newStore: {},
      cloneFromStore: '',
      cloneToStore: ''
    }
  }

  componentDidMount = () => {
    this.setState({message: "Select from the following options:"})
  }


// fetch all the production store data here
  displayProdStores = () => {
    this.refreshState();
    fetch('/api/business_units/src')
    .then(response => response.json())
    .then(stores => {
      this.setState({prodStores: stores});
    })
  }

  // show specific production store data here
    displaySingleProdStore = (e) => {
      this.refreshState();
      fetch(`/api/business_units/src/${this.state.viewProdStore}`,{
        method: 'GET',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(store => {
        console.log('store:', store);
        if (store && store.length > 0) {
          this.setState({singleProdStore: store[0]})
        }
        else {
          toastr.error('Store not found.');
        }
      });
    }

  // fetch all the test store data here
    displayTestStores = () => {
      this.refreshState();
      fetch('/api/business_units/dst')
      .then(response => response.json())
      .then(stores => {
        // console.log(stores);
        // console.log(this.state);
        this.setState({testStores: stores});
      })
    }

// show specific test store data here
  displaySingleStore = (e) => {
    this.refreshState();
    fetch(`/api/business_units/dst/${this.state.viewTestStore}`,{
      method: 'GET',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(store => {
      console.log('store:', store);
      if (store && store.length > 0) {
        this.setState({singleStore: store[0]})
      }
      else {
        toastr.error('Store not found.');
      }
    });
  }

// create new test store here
  createTestStore = (e) => {
    fetch(`/api/stores/dst/${this.state.cloneFromStore}?test_store_number=${this.state.cloneToStore}`,{
      method:'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json().then(stores => {
        console.log('stores', stores)
        if (response.ok) {
          this.setState({newStore: stores[1][0]});
          toastr.success(`Test Store #: ${this.state.newStore.str_nbr} has been created.`);
          this.refreshState();
        }
        else {
          return Promise.reject({status: response.status, data: stores.message})
        }
      });
    })
    .catch(err => {
      console.log('err:', err);
      toastr.error(err.data ? err.data : err);
    });
  }

  // delete test store here
    deleteTestStore = (store) => {
      fetch(`/api/stores/dst/${store.cmmn_bu_nm}`, {
        method:'DELETE',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          toastr.success(`Test Store #: ${store.cmmn_bu_nm} has been deleted.`);
          this.displayTestStores();
        }
        else {
          toastr.error('Oops: something went wrong!');
        }
      });
  }

  updateSingleProdStore = (e) => this.setState({viewProdStore: e.target.value})

  updateSingleStore = (e) => this.setState({viewTestStore: e.target.value})

  updateCloneToStore = (e) => this.setState({cloneToStore: e.target.value})

  updateCloneFromStore = (e) => this.setState({cloneFromStore: e.target.value})

  refreshState = (e) => this.setState({
    prodStores: [],
    testStores: [],
    singleStore: {},
    singleProdStore: {},
    viewTestStore: '',
    viewProdStore: '',
    newStore: {},
    cloneFromStore: '',
    cloneToStore: ''
  })

  isValidStoreNumber = (store) => {
    return store.match(/^[0-9]{4}$/);
  }

  validCreateNewTestStore() {
    return this.isValidStoreNumber(this.state.cloneFromStore) &&
           this.isValidStoreNumber(this.state.cloneToStore);
  }

  render() {
    let singleStore;
    let singleProdStore;

    const prodStoresMap = this.state.prodStores.map( store => {
      return (
        <div key={store.bu_id}>
          <hr/>
          <h3>Store #: {store.cmmn_bu_nm}</h3>
          <p>BU ID: {store.bu_id}</p>
          <p>Created On: {store.last_upd_ts}</p>
        </div>
      );
    });
    const prodStores = prodStoresMap.length > 0 ? (
      <div>
        <h1 className='store-banner'>Production Stores</h1>
        {prodStoresMap}
      </div>
    ) : null;

    if(this.state.singleProdStore.cmmn_bu_nm){
       singleProdStore = (
         <div>
           <hr/>
           <h3>Store #: {this.state.singleProdStore.cmmn_bu_nm}</h3>
           <p>BU ID: {this.state.singleProdStore.bu_id}</p>
           <p>Created On: {this.state.singleProdStore.last_upd_ts}</p>
           <hr/>
         </div>
       )
   }

    const testStoresMap = this.state.testStores.map( store => {
      return (
        <div key={store.bu_id}>
          <hr/>
          <h3>Store #: {store.cmmn_bu_nm}</h3>
          <p>BU ID: {store.bu_id}</p>
          <p>Created On: {store.last_upd_ts}</p>
          <button
            value="Delete Test Store"
            onClick={() => this.deleteTestStore(store)}
          >
            Delete Test Store
          </button>
        </div>
      );
    });

    const testStores = testStoresMap.length > 0 ? (
      <div>
        <h1 className='store-banner'>Test Stores</h1>
        {testStoresMap}
      </div>
    ) : null;

    if(this.state.singleStore.cmmn_bu_nm){
       singleStore = (
         <div>
           <hr/>
           <h3>Store #: {this.state.singleStore.cmmn_bu_nm}</h3>
           <p>BU ID: {this.state.singleStore.bu_id}</p>
           <p>Created On: {this.state.singleStore.last_upd_ts}</p>
           <hr/>
         </div>
       )
     }

    return (
      <div className="App">
        <header>
          <Header/>
        </header>
        <main>
          <h2>{this.state.message}</h2>
          <Controls app={this} />
          <div>{prodStores}</div>
          <div>{singleProdStore}</div>
          <div>{testStores}</div>
          <div>{singleStore}</div>
        </main>
      </div>
    );
  }
}

export default App;
