import React from 'react';

export class AccountDetailField extends React.Component {
  render () {
    const {type = 'text', fieldName, input, meta} = this.props;
    const {value, onChange} = input;
    const {touched, error} = meta;

      return (
      <div className='form-group'>
        <label htmlFor={fieldName} className='col-lg-2 control-label'>{fieldName}</label>
        <div className='col-lg-10'>
          <input type={type} className='form-control' id={fieldName}
            placeholder={fieldName} value={value} onChange={onChange}/>
          {touched && error && <div>{error}</div>}
        </div>
      </div>
    )
  }
}

export default AccountDetailField;
