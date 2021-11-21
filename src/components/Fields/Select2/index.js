import React, { useState, useEffect } from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from 'config';
import { storage } from 'services';

const Select2 = ({url, value, name, onChange, getValue, getLabel, isActive, placeholder, ...props}) => {

  const [state, setState] = useState([]);

  useEffect(() => {
    if(isActive === true){
      axios.get(`${config.API_ROOT}${url}`, {
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${storage.get('token')}`
        }
      })
      .then(res => {
        setState(res.data.data);
      })
      .catch(() => {
        console.log("Xatolik yuz berdi");
      });
    }
  }, [isActive, url, setState]);

  return (
    <>
      <select
        onChange={onChange}
        value={value}
        name={name}
        {...props}
      >
        <option value="" disabled >{placeholder}</option>
        {
          state.length
          ? state.map((item, key) => (
            <option value={get(item, getValue, '')} key={key}>{get(item, getLabel, '')}</option>
          ))
          : null
        }
      </select>
    </>
  );
};

Select2.defaultProps = {
  url: '',
  defaultValue: '',
  name: '',
  value: '',
  getValue: 'id',
  getLabel: 'name',
  placeholder: ''
};
Select2.propTypes = {
  url: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};


export default Select2;