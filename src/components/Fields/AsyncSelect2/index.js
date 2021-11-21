import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { api, storage } from 'services';
import get from 'lodash.get';
import PropTypes from 'prop-types';

const load = async ({ page, url, perPage, filterParams }) => {
  const { data: { data }} = await api.request.get(api.queryBuilder(url, { page, perPage, ...filterParams}), {
    headers: {
      "Authorization": `Bearer ${storage.get('token')}`
    }
  });

  return {
    options: get(data,'data'),
    hasMore: get(data, "meta.current_page", 1) < get(data, "meta.last_page", 1),
    additional: {
      page: get(data, 'meta.current_page', 1) + 1
    }
  }
};


const Select = (
  {
    url,
    perPage,
    optionLabel,
    optionValue,
    filterParams,
    defaultValue,
    value,
    onChange,
    inputClassName,
    hideSelectedOptions,
    closeMenuOnSelect,
    menuListHeight,
    ...rest
  }) => {

  const customStyles = {
    multiValueLabel: (props) => ({
      ...props,
      fontSize: '13px'
    }),
    menuList: props => ({
      ...props,
      height: menuListHeight
    }),
    option: (props) => ({
      ...props,
      fontSize: '14px'
    }),
    placeholder: (props) => ({
      ...props,
      fontSize: '14px'
    }),
    singleValue: (props) => ({
      ...props,
      fontSize: '14px'
    }),
  };


  return (
    <>
      <AsyncPaginate
        styles={customStyles}
        key={1}
        isCreatable={false}
        defaultValue={defaultValue}
        value={value}
        additional={{ page: 1 }}
        loadOptions={(search, prevOptions, { page }) => {

            return load({
              search,
              prevOptions,
              page,
              url,
              perPage,
              filterParams: typeof filterParams === 'function' ? filterParams(search) : filterParams
            })
          }
        }
        isMulti
        hideSelectedOptions={hideSelectedOptions}
        closeMenuOnSelect={closeMenuOnSelect}
        onChange={onChange}
        getOptionLabel={option => typeof optionLabel === 'function' ? optionLabel(option) : option[optionLabel]}
        getOptionValue={option => typeof optionValue === 'function' ? optionValue(option) : option[optionValue]}
        inputClassName={inputClassName}
        debounceTimeout={500}
        {...rest}
      />
    </>
  );
};

Select.defaultProps = {
  // url: '',
  optionValue: 'id',
  optionLabel: 'name',
  hideSelectedOptions: true,
  perPage: 20,
  closeMenuOnSelect: false
};

Select.propTypes = {
  url: PropTypes.string.isRequired
};


export default Select;