import React from 'react'

type Props = {
  field: Object,
  fieldName: String,
  type: String
};

export class AccountDetailField extends React.Component {
  props: Props;

  render () {
    const {type = 'text', fieldName, field = {}} = this.props;
    const {touched, error} = field;

    return (
      <div className='form-group'>
        <label htmlFor={fieldName} className='col-lg-2 control-label'>{fieldName}</label>
        <div className='col-lg-10'>
          <input type={type} className='form-control' id={fieldName}
            placeholder={fieldName} {...field}/>
          {touched && error && <div>{error}</div>}
        </div>
      </div>
    )
  }
}

export default AccountDetailField
