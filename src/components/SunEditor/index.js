import React from 'react';
import SunEditor from 'suneditor-react';

const MyEditor = ({field: {name}, form: {values, setFieldValue}}) => {

    return (
        <SunEditor
            setDefaultStyle="font-family: 'Montserrat'; font-size: 16px;"
            initialValue={values[name]}
            setContents={values[name]}
            setOptions={{
                height: '300px',
                font: ['Monserrat', 'Arial', 'Verdana', 'Roboto', 'Georgia', 'sans-serif'],
                placeholder: 'Enter content here...',
                buttonList: [["bold", "underline", "link", "undo", "redo","formatBlock", "fontSize", "italic", "subscript", "superscript", "removeFormat", "fontColor", "indent", "outdent", "align", "print", "preview","hiliteColor"]]
            }}
            onChange={content => setFieldValue(name, content)}
        />
    );
};


export default MyEditor;