import classNames from 'classnames';
import css from './index.module.scss';
import React from "react";

const StepDislay = ({ step, stepTotal }) => {
  return ( 
    <span className={classNames(css.step)}>
      <span>{step}</span>
      <span>/</span>
      <span>{stepTotal}</span>
      - {' '}
    </span> 
  )
};

export default StepDislay