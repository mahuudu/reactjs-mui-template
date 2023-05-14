import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';


Product.propTypes = {
    
};

function Product(props) {
    const match = useRouteMatch();

    return (
        <div>
            <h3>Product List </h3>
        
            <Switch>
                <Route path={match.url} exact component={ListPage} />
            </Switch>
        </div>
    );
}

export default Product;