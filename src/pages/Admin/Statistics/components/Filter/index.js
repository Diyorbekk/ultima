import React, { useState } from 'react';
import Select2 from 'components/Fields/Select2';
import InputPhone from 'components/Fields/InputPhone';
import AsyncSelect from 'components/Fields/AsyncSelect2';
import get from 'lodash.get';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

const Filter = ({ onChange, onClear }) => {
  const search = qs.parse((useLocation()).search);
  const [state, setState] = useState({
    filter_by_year: get(search, 'filter_by_year', ''),
    name: get(search, 'name',''),
    filter_by_status: get(search, 'filter_by_status', ''),
  });

  const handleChange = e => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={"bg-white rounded-2 px-3 py-4 my-3"}>
      <div className="row gy-3">
        <div className="col-xl-3 col-auto">
          <label htmlFor={"id"}>ID</label>
          <InputPhone
            id={"id"}
            className="form-control focus-none"
            name="id"
            type="text"
            value={state.id}
            onChange={handleChange}
          />
        </div>
        <div className="col-xl-3 col-auto">
          <label htmlFor="name">Название объекта</label>
          <input
            id={"name"}
            className="form-control focus-none"
            name="name_building"
            type="text"
            value={state.name_building}
            onChange={handleChange}
          />
        </div>
        <div className="col-xl-3">
          <label htmlFor="inspector">Инспектор</label>
          <div>
            <AsyncSelect
              name={"inspector"}
              id={"inspector"}
              value={state.inspector}
              url={"/admin/user/inspectors"}
              filterParams={(search) => {
                let extra = {};
                if(search){
                  extra = {
                    ...extra,
                    text: search
                  }
                }
                return {
                  extra: {...extra}
                }
              }}
              menuListHeight={'150px'}
              hideSelectedOptions={false}
              closeMenuOnSelect
              isMulti={false}
              placeholder={"Выберите заказчик"}
              optionLabel={"full_name"}
              onChange={inspector => setState(prevState => ({...prevState, inspector}))}
            />
          </div>
        </div>
        <div className="col-xl-3 col-auto">
          <label htmlFor="">Название компании / ИНН</label>
          <input
            className="form-control focus-none"
            name="company"
            type="text"
            value={state.company}
            onChange={handleChange}
          />
        </div>
        <div className="col-xl-3 col-auto">
          <label>Номер регистрации</label>
          <InputPhone
            className="form-control focus-none"
            name="registration_number"
            type="text"
            value={state.registration_number}
            onChange={handleChange}
          />
        </div>
        <div className="col-xl-3 col-auto">
          <label className={"font-size-14"} htmlFor={"region"}>Область</label>
          <Select2
            isActive
            value={state.region_id}
            url={"/object-control/region-list"}
            className="form-select focus-none"
            id="region"
            name="region_id"
            onChange={handleChange}
            placeholder={"Выберите регион"}
          />
        </div>
        <div className="col-xl-3 col-auto" id="districtList">
          <label htmlFor={"district"}>Город/Район</label>
          <Select2
            value={state.district_id}
            isActive={state.region_id}
            url={"/object-control/district-list/"+state.region_id}
            className="form-select focus-none"
            id="district"
            name="district_id"
            disabled={!state.region_id}
            onChange={handleChange}
            placeholder={"Выберите район"}
          />
        </div>
        <div className="col-xl-3 col-auto">
          <label htmlFor="year">Год</label>
          <select id={"year"} className="form-select focus-none" value={state.filter_by_date} name="filter_by_date" onChange={handleChange}>
            <option value="">Все</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </div>
      </div>
      <div className={"text-end pt-4"}>
        <button
          className={"btn btn-danger btn-sm text-white focus-none ml-2"}
          onClick={() => {
            setState({
              name: '',
              filter_by_status: '',
              filter_by_year: '',
            });
            onClear()
          }}
        >
          <i className={"fal fa-redo mr-2"}/>
          Очистить
        </button>
        <button className={"btn btn-primary btn-sm text-white focus-none ml-2 px-3"}
                onClick={() => {
                  const values = {...state, inspector: state.inspector.id};
                  onChange(values);
                }}
        >
          <i className={"fal fa-search mr-2"}/>
          Поиск
        </button>
      </div>
    </div>
  );
};

export default Filter;