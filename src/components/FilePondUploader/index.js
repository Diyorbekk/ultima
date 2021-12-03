import React, {useRef, useState} from 'react';
import {FilePond, registerPlugin} from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

registerPlugin(FilePondPluginImageTransform,FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType)

const FilePondUploader = ({id, field, form: {values, setFieldValue}}) => {
    const [files, setFiles] = useState([])
    const filePondRef = useRef(null)

    const handleChange = (e) => {
        setFiles(e);
        setFieldValue(field.name, e);

        if (e.length === 0) {
            setFieldValue(field.name, null);
        }

    };

    return (
        <>
            <FilePond
                files={files}
                allowImageTransform={true}
                allowReorder={true}
                acceptedFileTypes={['image/*']}
                imageTransformOutputQuality={0}
                imageTransformOutputQualityMod={'always'}
                ref={filePondRef}
                id={id}
                name={"input"}
                allowMultiple={true}
                onupdatefiles={handleChange}
                onremovefile={(file,FileIndex) => {
                    const index = field.value.indexOf(FileIndex);
                    if (index > -1) {
                        field.value.splice(index, 1);
                    }
                }}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </>
    )
}
export default FilePondUploader