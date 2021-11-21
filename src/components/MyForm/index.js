import React from "react";
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const Form = (props) => {

  return (
    <form className={props.className} onSubmit={props.handleSubmit} autoComplete="off">
      {props.children({...props})}
    </form>
  )
};

Form.defaultProps = {
  className: '',
  onSubmit: () => {},
};

Form.propTypes = {
  fields: PropTypes.array.isRequired
};

const MyForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ fields }) => {
    return Array.isArray(fields)
      ? fields.reduce((acc,curr) => ({...acc, [curr.name]: curr.value}), {})
      : {};
  },
  validationSchema: ({ fields, t }) => {

    if(!Array.isArray(fields)){
      return Yup.object().shape({});
    }
    const shape = {};

    fields.forEach((field) => {
      let valField;


      switch (field.type) {
        case 'string':
          valField = Yup.string();
          break;
        case 'object':
          valField = Yup.object();
          break;
        case 'array':
          valField = Yup.array();
          break;
        case 'arrayOfObject':
          valField =
            Yup.array()
            .of(
              Yup.object().shape({
                [field.labelName]: Yup.string().matches(field.regex(), ({ value }) => {
                  if(value.length > field.minLength && value.length !== field.maxLength){
                    return field.maxText
                  } else
                  if(value.length > 0 && value.length < field.minLength){
                    return field.minText;
                  }
                }).required(field.requiredLabel),
              })
            );
          break;
        case 'date':
          valField = Yup.date();
          break;
        case 'email':
          valField = Yup.string().email();
          break;
        case 'number':
          valField = Yup.number().typeError('Must be a number');
          break;
        case 'boolean':
          valField = Yup.boolean().oneOf([true], t("formText.1"));
          break;
        default:
          valField = Yup.string();
      }

      if(field.selfRegex){
        valField = valField.matches(field.selfRegex(), ({ value }) => {
          if(value.length > field.minLength && value.length !== field.maxLength){
            return field.maxText
          } else
          if(value.length > 0 && value.length < field.minLength){
            return field.minText;
          }
        });
      }

      if(field.when){
        valField = field.when(valField);
      }

      if(field.min){
        valField = valField.min(field.min, t("formText.2"));
      }
      if(field.max){
        valField = valField.max(field.max, t("formText.3"));
      }

      if(field.lessThan){
        valField = valField.lessThan(field.lessThan, t("formText.2"));
      }
      if(field.moreThan){
        valField = valField.moreThan(field.moreThan, t("formText.3"));
      }

      if(field.required){
        if(field.requiredLabel){
          valField = valField.required(field.requiredLabel);
        }else{
          valField = valField.required("Required");
        }
      }

      valField = valField.nullable();

      shape[field.name] = valField;
    });

    return Yup.object().shape(shape);
  },
  handleSubmit: (
    values, { props, setSubmitting, resetForm }
  ) => {
    const { fields, sendAsFormData } = props;

    let data = {...values};

    fields.forEach((field) => {

      if(field.hasOwnProperty('multiLang')){
        if(field.multiLang){
          data[`${field.name}_${data.lang}`] = data[field.name];
          delete values[field.name];
        }
      }

      if(field.hasOwnProperty('onSubmitValue')){
        if(typeof field.onSubmitValue === 'function'){
          data[field.name] = field.onSubmitValue(data[field.name], data);
        }
      }

      if(field.hasOwnProperty('removeOnSubmit')){
        delete data[field.name];
      }
    });

    let formData = data;

    if(sendAsFormData){
      formData = new FormData();
      Object.keys(data).forEach((name) => {
        formData.append(name, data[name]);
      });
    }

    props.onSubmit({values: data, setSubmitting, resetForm });
  },
})(Form);


export default MyForm;