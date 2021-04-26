import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-bottom.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ addItem, item }) =>{
    const { name, price, imageUrl } = item;

    return (
        <div className="collection-item">
    
            <div className="image" style={{
                    backgroundImage: `url(${imageUrl})`
                }} />
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
    
            <section className="custom-button">
            <CustomButton onClick={()=> addItem(item)} inverted>Add to cart</CustomButton>
            </section>
        </div>
    )
}

const mapDipatchToProps = dispatch =>({

    addItem: item => dispatch(addItem(item))
})



export default connect(null, mapDipatchToProps)(CollectionItem);