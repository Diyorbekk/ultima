import React, { useState } from 'react';
import { LoadAll } from 'schema/Container';
import get from 'lodash.get';
import Pagination from 'components/Pagination';
import Empty from 'components/Empty';
import Spin from 'components/GearSpin';
import Modal from 'components/Modal';

const CompanyType = () => {

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [selectedObject, setObject] = useState(null);


  return (
    <>
      <Modal
        isOpen={!!selectedObject}
        width={700}
        onClose={() => setObject(null)}
        position={"center"}
      >
        <div className={"p-4"}>
          <div className={"mb-5 fw-medium font-size-18"}>
            <div className={"mb-3"}>Название категории мониторинга:</div>
            <div>{get(selectedObject,'name_uz')}</div>
          </div>
          <div className={"text-end"}>
            <button className={"btn btn-primary text-white focus-none"} onClick={() => setObject(null)}>Закрыт</button>
          </div>
        </div>
      </Modal>
      <div className="py-4">
        <h1 className="font-size-24 text-dark-blue fw-semibold">Уведомление</h1>
      </div>
      <div className={"mb-3"}>
        <select
          className={"d-inline-block w-auto form-select form-select-sm focus-none"}
          name="perPage"
          id="perPage"
          value={perPage}
          onChange={e => {
            setPage(1);
            setPerPage(e.target.value);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
      <Empty />

      {/*<LoadAll*/}
      {/*  url={'/admin/oc/notification'}*/}
      {/*  name={"notification"}*/}
      {/*  params={{*/}
      {/*    page,*/}
      {/*    perPage,*/}
      {/*  }}*/}
      {/*  onSuccess={() => {*/}
      {/*    document.querySelector(".wrapper-block").scrollTo({*/}
      {/*      top: 0,*/}
      {/*      behavior: "smooth"*/}
      {/*    })*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {({ isFetched, data=[], meta={}}) => {*/}

      {/*    return <>*/}
      {/*      <Empty />*/}
      {/*      <Spin*/}
      {/*        isSpinning={!isFetched}*/}
      {/*      >*/}
      {/*        {*/}
      {/*          data.length*/}
      {/*            ? <div className="content">*/}
      {/*              <div className="contents d-flex flex-wrap">*/}
      {/*                <div className="col-md-6 col-12 content-col">*/}
      {/*                  <div className="content-notification">*/}
      {/*                    <div className="d-flex align-items-start justify-content-between mb-3">*/}
      {/*                      <div className="d-flex align-items-start">*/}
      {/*                        <div>*/}
      {/*                          <span></span>*/}
      {/*                        </div>*/}
      {/*                        <p className="content-notification_title text-break">*/}
      {/*                          Диққат!*/}
      {/*                        </p>*/}
      {/*                      </div>*/}

      {/*                      <p className="content-notification_date">*/}
      {/*                        21/02/2021*/}
      {/*                      </p>*/}
      {/*                    </div>*/}

      {/*                    <p className="content-notification_text">*/}
      {/*                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus, ac convallis sem scelerisque*/}
      {/*                      eget. Pulvinar commodo cursus nulla sagittis eget pulvinar sagittis. Ornare eu ut ac feugiat*/}
      {/*                      aliquet imperdiet lacus velit quis. Aliquam, porttitor tempus, arcu, vulputate eu. ac*/}
      {/*                      convallis sem scelerisque eget. Pulvinar commodo cursus nulla sagittis eget pulvinar*/}
      {/*                      sagittis. Ornare eu ut ac feugiat aliquet imperdiet lacus velit quis. Aliquam, porttitor*/}
      {/*                      tempus, arcu, vulputate eu. ac convallis sem scelerisque eget. Pulvinar commodo cursus nulla*/}
      {/*                      sagittis eget pulvinar sagittis. Ornare eu ut ac feugiat aliquet imperdiet lacus velit quis.*/}
      {/*                      Aliquam, porttitor tempus, arcu, vulputate eu.*/}
      {/*                    </p>*/}

      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            : null*/}
      {/*        }*/}
      {/*      </Spin>*/}
      {/*      {*/}
      {/*        isFetched && !data.length*/}
      {/*        ? <Empty />*/}
      {/*        : null*/}
      {/*      }*/}
      {/*      <Pagination*/}
      {/*        className={'justify-content-end pt-3'}*/}
      {/*        initialPage={1}*/}
      {/*        pageCount={Math.ceil(get(meta,'total',1) / perPage)}*/}
      {/*        onChange={n => setPage(n)}*/}
      {/*      />*/}
      {/*    </>*/}
      {/*  }}*/}
      {/*</LoadAll>*/}
    </>
  );
};

export default CompanyType;