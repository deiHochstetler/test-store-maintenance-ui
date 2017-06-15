import React, {Component} from 'react';

class Controls extends Component {

  render() {
    const buttonStyle = {maxwidth: 800, margin: '0 auto 10px'};
    return (
      <section>
        <div className="Maintenance-Option">
          <article className="Prod">
            <button
              style={buttonStyle}
              onClick={this.props.app.displayProdStores}>
              View All Production Stores
            </button>
          </article>

          <article className="SingleProd">
            <button
              value="View Production Store"
              onClick={this.props.app.displaySingleProdStore}
              disabled={!this.props.app.isValidStoreNumber(this.props.app.state.viewProdStore)}>
              View Production Store
            </button>
            <input
               ref="prodStore"
               type="text"
               name="prodStore"
               placeholder="Enter prod store nbr"
               value={this.props.app.state.viewProdStore}
               onChange={this.props.app.updateSingleProdStore}/>
          </article>

          <article className="All">
            <button
              style={buttonStyle}
              onClick={this.props.app.displayTestStores}>
              View All Test Stores
            </button>
          </article>

          <article className="Single">
            <button
              value="View Test Store"
              onClick={this.props.app.displaySingleStore}
              disabled={!this.props.app.isValidStoreNumber(this.props.app.state.viewTestStore)}>
              View Test Store
            </button>
            <input
               ref="testStore"
               type="text"
               name="testStore"
               placeholder="Enter test store nbr"
               value={this.props.app.state.viewTestStore}
               onChange={this.props.app.updateSingleStore}/>
          </article>

          <article className="Create">
            <button
              value="Create New Test Store"
              onClick={this.props.app.createTestStore}
              disabled={!this.props.app.validCreateNewTestStore()}>
              Create New Test Store
            </button>
            <input
               ref="prodStore"
               type="text"
               name="productionStore"
               placeholder="Enter prod store nbr"
               value={this.props.app.state.cloneFromStore}
               onChange={this.props.app.updateCloneFromStore}/>
            <input
               ref="testStore"
               type="text"
               name="testStore"
               placeholder="Enter test store nbr"
               value={this.props.app.state.cloneToStore}
               onChange={this.props.app.updateCloneToStore}/>
          </article>
        </div>

        <div className="Refresh">
           <button
             value="Refresh"
             onClick={this.props.app.refreshState}>
             Clear
           </button>
        </div>
      </section>
    );
  }
}

export default Controls;
