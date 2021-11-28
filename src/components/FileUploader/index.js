import React, {useState} from 'react';
import "./uploader.scss";
import Compressor from "compressorjs";

const FileUpload = ({id, field, form: {values, setFieldValue}}) => {
    const [size, setSize] = useState(null)

    const handleChange = (e) => {
        setFieldValue(field.name, e.target.files[0]);
        console.log(field.name)
        const image = e.target.files[0];
        new Compressor(image, {
            quality: 0.8,
            success: (compressedResult) => {
                setFieldValue(field.name, compressedResult);
                setSize((compressedResult.size / 1048576).toFixed(3))
            },
        });

    };

    if (values[field.name]) {

        let img = values[field.name];
        if (typeof values[field.name] !== 'string') {
            img = URL.createObjectURL(values[field.name]);
        }
        return (
            <div
                className={'has-bg position-relative image-preview'}
                style={{
                    backgroundImage: `url(${img})`,
                }}
            >

      <span className="file-uploader_size right">{id}
          {size === null ?
              null
              : ` (${size} mb)`
          }    </span>
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