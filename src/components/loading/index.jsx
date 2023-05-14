import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from 'react-loader-spinner';

Loading.propTypes = {
    
};

function Loading(props) {
    return (
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
}

export default Loading;