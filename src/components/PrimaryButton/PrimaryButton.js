import React from 'react'
import Button from 'react-bootstrap/Button'
import classNames from 'classnames'
import './PrimaryButton.css'

const PrimaryButton = props => 
  <Button 
    {...props} 
    className={classNames('PrimaryButton', props.className)}
    variant="warning"
  >
    {props.children}
  </Button>

export default PrimaryButton