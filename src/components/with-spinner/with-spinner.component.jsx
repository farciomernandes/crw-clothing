import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';
//receives a component to render and render the Spinner animation while the component is loading
const WithSpinner = WrappedComponent =>{ 
    const Spinner = ({ isLoading, ...otherProps })=>{
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        )
        :
        <WrappedComponent {...otherProps} />
    };
        return Spinner;
}
export default WithSpinner;