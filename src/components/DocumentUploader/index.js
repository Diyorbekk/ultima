import React, { useState } from 'react';
import { api } from 'services';
import PaperClip from 'assets/images/paper-clip.svg';
import get from 'lodash.get';
import filesize from 'filesize';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./style.css";

const FileUpload = ({ values, inputName, id, text, displayName, onSuccess, fileType="", progressBar, isMulti, showPreview, onChange, formats, icon}) => {
  const { t } = useTranslation();
  const [selectedFile, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isError, setError] = useState(false);

  const handleChange = (file) => {

    if(formats.includes(('.'+file.name.split('.').pop()).toString().toLowerCase())){
      onChange([...values[inputName], file]);
    }else{
      toast.error("Noto'g'ri fayl yuklandi");
    }
  };

  // const handleUpload = () => {
  //   setError(false);
  //   const data = new FormData();
  //   data.append('file', selectedFile);
  //   data.append('tender_id', id);
  //   data.append('type', fileType);
  //   data.append('role', 'customer');
  //
  //   var config = {
  //     onUploadProgress: (progressEvent) => {
  //       var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
  //       setProgress(percentCompleted);
  //     }
  //   };
  //
  //   api.request.post(api.queryBuilder('/upload-customer-excels', {}), data, config)
  //     .then(function (res) {
  //       onSuccess(res.data.data);
  //       setTimeout(function () {
  //         toast.success("Fayl yuklandi");
  //         setFile(null);
  //         setProgress(0);
  //       },1000);
  //     })
  //     .catch(function (err) {
  //       toast.error("Xatolik yuz berdi");
  //       setProgress(0);
  //       setError(true);
  //     });
  // };


  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleChange(files[0]);
  };

  const handleRemove = i => {
    const filtered = values[inputName].filter((_, index) => i !== index);
    onChange(filtered);
  };


  return (
    <div>
      {
        isMulti || values[inputName].length === 0
        ? <div className={"position-relative mb-2"}>
            <input
              className={'uploader-input position-absolute h-100 w-100 top-0 start-0 cursor-pointer'}
              type="file"
              id={id || "file"}
              name={inputName}
              onChange={e => {
                const file = e.target.files[0];
                handleChange(file);
              }}
              accept={formats.join(",")}
            />
            <label
              className={'document-uploader file-uploader file-uploader-hover  w-100 font-size-18'}
              htmlFor={id || "file"}
              onDragEnter={e => {
                preventDefaults(e);
                e.target.classList.add('active');
              }}
              onDragOver={e => {
                preventDefaults(e);
                e.target.classList.add('active');
              }}
              onDragLeave={e => {
                preventDefaults(e);
                e.target.classList.remove('active');
              }}
              onDrop={e => {
                preventDefaults(e);
                e.target.classList.remove('active');
                handleDrop(e);
              }}
            >
              {/*<img className={"mr-2"} width={30} src={PaperClip} alt="Upload"/>*/}
              <span className={"font-size-24 mr-2"}>
                {icon}
              </span>
              { text }
            </label>
          </div>
        : null
      }

      {/*{*/}
      {/*  selectedFile*/}
      {/*    ? <>*/}
      {/*      <div className={"d-flex justify-content-between align-items-center file-view p-3 bg-F1F6FB "}>*/}
      {/*        <div className={'d-flex align-items-center'}>*/}
      {/*          <span onClick={() => setFile(null)} className={'text-danger cursor-pointer mr-3'}><i className={'fa fa-times font-weight-light'}/></span>*/}
      {/*          <div>*/}
      {/*            <div className="file-name font-size-18">{get(selectedFile,'name','')}</div>*/}
      {/*            <small className={'file-size '}>{filesize(get(selectedFile,'size',''))}</small>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      {*/}
      {/*        progressBar && !isError*/}
      {/*          ? <div className={"progress rounded-0 position-relative"}>*/}
      {/*            <div className="progress-bar show-progress" style={{ background: "#5ac773",width: progress + "%"}} data-progress={progress+"%"}/>*/}
      {/*          </div>*/}
      {/*          : null*/}
      {/*      }*/}
      {/*    </>*/}
      {/*    : null*/}
      {/*}*/}

      {
        showPreview
        ? <div>
            {
              values[inputName].length
              ? <div className="file-wrapper p-3 rounded-2">
                  {
                    values[inputName].map((file, key) => (
                      <div key={key} className={"file-tem d-flex align-items-center rounded-3 p-3 bg-white mb-1"}>
                        <div className={'file-number px-3'}>{key + 1}</div>
                        <div className={'px-3 flex-fill file-content border-start border-end'}>
                          <div>
                            <div>{get(file,'name') ? get(file,'name') : get(file,displayName)}</div>
                            {
                              get(file,'size')
                              ? <span className={'font-size-12'}>{filesize(get(file,'size',0))}</span>
                              : null
                            }
                          </div>
                        </div>
                        <div className={'text-center px-3 file-icon'}>
                          <span className={'btn btn-danger'} onClick={() => handleRemove(key)}>
                            <i className={'fa fa-trash-alt'}/>
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              : null
            }
          </div>
        : null
      }
    </div>
  );
};

FileUpload.defaultProps = {
  id: '',
  progressBar: false,
  showPreview: true,
  text: "Загрузит файлы",
  formats: [".doc",".docx",".xls",".xlsx",".pdf",".zip",".rar", ".jpg", ".jpeg", ".png", ".gif", ".svg"],
  icon: <i className="fal fa-paperclip" />,
  onChange: () => {},
  isMulti: false,
  displayName: 'name'
};

export default FileUpload;