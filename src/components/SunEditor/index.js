import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';

const MyEditor = ({ field: { name }, form: { values, setFieldValue }}) => {

  return (
    <SunEditor
      setDefaultStyle="font-family: 'Montserrat'; font-size: 16px;"
      initialValue={values[name]}
      setContents={values[name]}
      setOptions={{
        height: '300px',
        font: ['Monserrat', 'Arial', 'Verdana', 'Roboto', 'Georgia', 'sans-serif'],
        placeholder: 'Enter content here...',
        buttonList: buttonList.complex
      }}
      onChange={content => setFieldValue(name, content)}
    />
  );
};



export default MyEditor;