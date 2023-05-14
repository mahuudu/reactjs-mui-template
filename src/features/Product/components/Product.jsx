import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import {STATIC_HOST} from 'constants/index';


ProductItem.propTypes = {
    product: PropTypes.object,
};

function ProductItem({product}) {

    const thumnailUrl = product.image_link ? `${STATIC_HOST}/uploads/image/${product.image_link}` : `https://via.placeholder.com/444`;

    return (
                        <Box padding={1}> 
                            <Box>
                                 <img src={thumnailUrl} alt={product.name_product} width="100%" />
                            </Box>
                            <Typography variant="body2">
                                 {product.name_product} 
                            </Typography>
                            <Typography variant="body2">
                                 {product.discount > 0 ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.discount) :
                                  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) } 
                                 - {product.discount > 0 ? Math.ceil(product.price - product.discount / product.price * 100) + `%`: ''}
                            </Typography>
                        </Box>
    );
}

export default ProductItem;