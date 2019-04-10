import React from 'react';
import './Auth.scss'

const InputWithLabel = ({label, ...rest}) => {
  return (
    <div className="InputWithLabelWrapper">
      <div className="InputWithLabelLabel">{label}</div>
      <input className="InputWithLabelInput" {...rest}/>
    </div>
  )
}

export default InputWithLabel;