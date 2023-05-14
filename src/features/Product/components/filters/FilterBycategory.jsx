import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import categoryApi from 'api/Category';

FilterBycategory.propTypes = {
    onChange : PropTypes.func
};

function FilterBycategory({onChange}) {

    const [categoryList,setCategoryList] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        (async ()=>{
            try{    
                const { category } = await categoryApi.getAll();
                setCategoryList(category.map(x => ({
                    id : x.cat_id,
                    name : x.category_name
                })));
            }catch(error){
                console.log("Error on category", error);
            }
            setLoading(false);
        })()
    },[])

    const handleCategoryClick = (categoryId) =>{
        if(!onChange) return;
        onChange(categoryId);
    }

    return (
        <Box>
            <Typography> Danh mục sản phẩm </Typography>
            {!loading ? categoryList.map((category) => (
                <li key={category.id} onClick={()=>handleCategoryClick(category.id)}>
                    {category.name}
                </li>
            )) : 'loading'}
        </Box>
    );
}

export default FilterBycategory;