import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Loading from 'components/loading';
import ProductListSkeletonList from '../components/ProductListSkeletonList';
import productApi from 'api/productapi';
import ProductList from '../components/ProductList';
import Pagination from '@material-ui/lab/Pagination';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/filters/ProductFilters';


ListPage.propTypes = {
    
};

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  }));

function ListPage(props) {  

    const classes = useStyles();
    const [loading,setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const countRef = useRef(0);



    const [pagination,setPagination] = useState({
        limit : 8,
        total : 10,
        page : 1
    })

    const [filter,setFilter] = useState({
        page : 1,
        limit :10,
        sort : 'salePrice:ASC'
    });

    const handlePageChange = (e,page) => {
        setLoading(true);
        setFilter((prevFilter) => ({
            ...prevFilter,
            page : page,
        }))
    }

    useLayoutEffect(() => {
        countRef.current++;
        console.log(`Clicked ${countRef.current} times`);

        
        (async () => {
            try{
                const { pagination , products } = await productApi.getAll(filter);
                setPagination(pagination);
                console.log('runEfect');
                setProductList(products);
            }catch{

            }
            
            setLoading(false);
            console.log('runEfect 2');
        })();
    },[filter,loading]);

    

    const handleSortChange = (newValue) => {
        setLoading(true);
        setFilter((prevFilter)=>({
            ...prevFilter,
            sort : newValue
        }))
    }

    const handleFilters = (newFilters) => {
        setLoading(true);
        setFilter((prevFilter)=>({
            ...prevFilter,
            ...newFilters
        }));
     
    }

    
    

    return (
        <React.Fragment>
            <div>
                <Container>
                <Grid container spacing={3}>
                <Grid item xs={4}>
                     <Paper className={classes.paper}>
                        <ProductFilters onChange={handleFilters} filters={filter} />
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                     <Paper className={classes.paper}>
                         <ProductSort currentSort={filter.sort} onChange={handleSortChange} />
                        {loading ? <ProductListSkeletonList/> : <ProductList data={productList} /> }
                        {loading ? 'loading' : <Pagination 
                         count={Math.ceil(pagination.total / pagination.limit)}
                         page={pagination.page} color="primary"
                         onChange={handlePageChange}
                         />}
                    </Paper>
                </Grid>
               

            </Grid>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default ListPage;