import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const ColectionsOverview = ({ collections }) => {
    return(
        <div className="collections-overview">
             {
                    collections.map(({id, ...otherCollectionProps})=>(
                        <CollectionPreview key={id} { ...otherCollectionProps } />
                    ))
                }
        </div>
    )
}



const maptStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(maptStateToProps)(ColectionsOverview);