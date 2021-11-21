import React from 'react';
import YandexMap from 'components/YandexMap';
import get from "lodash.get";
import Spin from 'components/AntSpin';


const Info = ({ isFetched, data }) => {

  return (
    <div className={"bg-white rounded-3 p-lg-4 p-3"}>
      <Spin isSpinning={!isFetched}>
        <h1 className="mb-4 font-size-18">Информация об объекте</h1>
        <div className="row mb-3">
          <div className="col-md-2">
            <span className="fw-medium font-size-14">Наименование:</span>
          </div>
          <div className="col-md-9">
            <p className="m-0 text-primary fw-medium font-size-13">{get(data,'name_building')}</p>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <span className="fw-medium font-size-14">Заказчик:</span>
          </div>
          <div className="col-md-9">
            <div className="m-0 fw-medium font-size-14">
              {
                get(data,'responsibles.customers', []).length
                ? get(data,'responsibles.customers').map((item,key) => <div key={key}>{get(item,'info','')}</div>)
                : null
              }
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <span className="fw-medium font-size-14">Подрядчик:</span>
          </div>
          <div className="col-md-9">
            <div className="m-0 fw-medium font-size-14">
              {
                get(data,'responsibles.contractors', []).length
                  ? get(data,'responsibles.contractors').map((item,key) => <div key={key}>{get(item,'info','')}</div>)
                  : null
              }
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <span className="fw-medium font-size-14">Проектировшик:</span>
          </div>
          <div className="col-md-9">
            <div className="m-0 fw-medium font-size-14">
              {
                get(data,'responsibles.planners', []).length
                  ? get(data,'responsibles.planners').map((item,key) => <div key={key}>{get(item,'info','')}</div>)
                  : null
              }
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <span className="fw-medium font-size-14">Площадь земле:</span>
          </div>
          <div className="col-md-9">
            <p className="m-0 fw-medium font-size-14">-</p>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-2">
            <span className="fw-medium font-size-14">Площадь строительства:</span>
          </div>
          <div className="col-md-9">
            <p className="m-0 fw-medium font-size-14">-</p>
          </div>
        </div>

        <div className={"text-black-50 fw-medium mb-2 font-size-14"}>Фото объекта:</div>
        <div className="font-size-14 fw-medium">
          {
            get(data,"files") && get(data,"files").length
              ? <div className="">
                {
                  get(data,"files").map((item, key) => (
                    <div key={key} className={"file-tem d-flex align-items-center rounded-3 p-3 bg-white mb-1 shadow-sm border"}>
                      <div className={'file-number px-3'}>{key + 1}</div>
                      <div className={'px-3 flex-fill file-content border-start border-end'}>
                        <div>{get(item,'description') ? get(item,'description') : "File"}</div>
                      </div>
                      <div className={'text-center px-3 file-icon'}>
                        <a href={get(item,'file')} target={"_blank"} download rel={"noopener noreferrer"} className={'py-1 px-2 font-size-18'}>
                          <i className="fal fa-arrow-to-bottom" />
                        </a>
                      </div>
                    </div>
                  ))
                }
              </div>
              : "Файлов нет"
          }
        </div>
        {
          get(data, 'map_lt') && get(data, 'map_lt')
          ? <div className={"pt-4"}>
              <div className={"mb-2"}>На карте</div>
              <div className={"rounded-3 border overflow-hidden"} style={{ height: '500px'}}>
                <YandexMap
                  height={'500px'}
                  center={[get(data,'map_lt'), get(data,'map_ln')]}
                  placeMarkCord={[get(data,'map_lt'), get(data,'map_ln')]}
                />
              </div>
            </div>
          : null
        }
      </Spin>
    </div>
  );
};

export default Info;