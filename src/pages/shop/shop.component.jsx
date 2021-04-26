import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollecitonSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

//add spinner loading animation for the CollectionsOverview and CollectionPage
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
      loading: true
    }
  

  unsubscribeFromSnapshot = null;

  componentDidMount(){
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

   collectionRef.get()
    .then( async snapshot=>{
      const collectionsMap = convertCollecitonSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false })
    })
    
      
  }


  render(){
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props)=> <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={loading} {...props} />} />
      </div>
    );
  }
  
}

const mapStateToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapStateToProps)(ShopPage);