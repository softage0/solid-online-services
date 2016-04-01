import React from 'react'

type Props = {
  field: Object,
  fieldName: String,
  type: String
};

export class AccountDetailField extends React.Component {
  props: Props;

  render () {
    let type = this.props.type || 'text'

    return (
      <div className='form-group'>
        <label htmlFor={this.props.fieldName} className='col-lg-2 control-label'>{this.props.fieldName}</label>
        <div className='col-lg-10'>
          <input type={type} className='form-control' id={this.props.fieldName}
            placeholder={this.props.fieldName} {...this.props.field}/>
          {this.props.field.touched && this.props.field.error && <div>{this.props.field.error}</div>}
        </div>
      </div>
    )
  }
}

export default AccountDetailField

