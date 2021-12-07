import React, {useEffect, useState} from 'react';
import Compressor from "compressorjs";
import "./uploader.scss";


const FilePondUploader = ({id, field, form: {values, setFieldValue}}) => {
    const [size, setSize] = useState(null)

    useEffect(()=> {
        if (values[field.name] === null || values[field.name].length === 0) {
            setSize(null)
        } else {
            setSize(values[field.name])
        }
    },[])

    const handleChange = (e) => {
        const fileListFor = e.target.files;
        let compressedImgs = [];
        let fileArray = [];
        for (let file of fileListFor) {
            fileArray.push({
                "url": URL.createObjectURL(file),
                "name": file.name
            })
            new Compressor(file, {
                quality: 0.8,
                success: function (compressedResult) {
                    compressedImgs.push(compressedResult);
                    setFieldValue(field.name, compressedImgs)
                },
            });

        }
        setSize(fileArray)
    };

    const handleRemoveItem = (id,full) => {
        setSize(() => {
            const list = size.filter(item => item.name ? item.name !== id : item !== full);
            return list
        });
        return setFieldValue(field.name, field.value.filter(item => {return item.name ? item.name !== id : item !== full}));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> {
        if (size !== null) {
            if (size.length === 0) {
                setSize(null)
            }
        }
    },)

    return (
        <div>
            <label className={'file-uploader'} htmlFor={id}>
                <input
                    className={'d-none'}
                    type="file"
                    id={id}
                    onChange={handleChange}
                    multiple
                    accept=".png,.jpg,.jpeg"
                />
                +
            </label>

            <div className="col-12 my-4">
                {
                    values[field.name] !== null
                        ? <div className="image_view row">
                            {
                                size !== null
                                    ? size.length
                                    ? <>
                                        {
                                            size.map((result, index) => {
                                                return <React.Fragment key={index}>
                                                    <div className="col-md-4 px-0 position-relative">
                                                        <img src={result.url || result} className="image-preview_img" alt="photos"/>
                                                        <span
                                                            className={'remove-preview'}
                                                            onClick={() => handleRemoveItem(result.name, result)}
                                                        >&times;</span>
                                                    </div>
                                                </React.Fragment>
                                            })
                                        }
                                    </>
                                    : null
                                    : null
                            }

                        </div>
                        : null
                }
            </div>

        </div>
    );
};
export default FilePondUploader