import React from 'react';
import "./uploader.scss";

const FileUpload = ({
  id,
  field,
  form: {values, setFieldValue}
}) => {

  const handleChange = (e) => {
    setFieldValue(field.name, e.target.files[0]);
  };

  if(values[field.name]){

    let img = values[field.name];
    if(typeof values[field.name] !== 'string'){
      img = URL.createObjectURL(values[field.name]);
    }
    return (
      <div
        className={'has-bg position-relative image-preview'}
        style={{
          backgroundImage: `url(${img})`,
          height: 150,
          width: 150,
        }}
      >
      <span
        className={'remove-preview'}
        onClick={() => setFieldValue(field.name, null)}
      >&times;</span>
      </div>
    )
  }

  return (
    <div>
      <label className={'file-uploader'} htmlFor={id}>
        <input
          className={'d-none'}
          type="file"
          id={id}
          onChange={handleChange}
          accept=".png,.jpg,.jpeg"
        />
        +
      </label>
    </div>
  );
};

export default FileUpload;