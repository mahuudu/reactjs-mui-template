import React from 'react';
import PropTypes from 'prop-types';
import FilterBycategory from './FilterBycategory';

ProductFilters.propTypes = {
    filters : PropTypes.object.isRequired,
    onChange : PropTypes.func
};

function ProductFilters({onChange,filters}) {

    const handleCategoryChange = (newCategoryId) => {
        if(!onChange) return;
        const newFilters = {
            ...filters,
            categoryId : newCategoryId
        }
        onChange(newFilters);
    }


    return (
       <FilterBycategory onChange={handleCategoryChange}/>
    );
}

export default ProductFilters;