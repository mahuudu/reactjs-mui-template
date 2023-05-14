import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
    currentSort : PropTypes.string.isRequired,
    onChange: PropTypes.func
};

function ProductSort({currentSort,onChange}) {
  
    const handleOnChange = (event, newValue) =>{
        if(onChange){
            onChange(newValue);
        }
    }

    return (
        <div>
            <Paper square>
            <Tabs
                value={currentSort}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleOnChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Thấp tới cao" value="salePrice:ASC" />
                <Tab label="Cao tới thấp" value="salePrice:DESC" />
            </Tabs>
            </Paper>
        </div>
    );
}

export default ProductSort;