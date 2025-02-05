import css from './index.module.scss';
import React from "react"


const Loader = () => {

  return ( 
    <div className={css.universe}>
      <div className={css.galaxy}>
        <div className={css.circle}></div>
        <div className={css.circle2}></div>
        <div className={css.circle3}></div>
        <div className={css.orbit0}>
          <div className={css.pos0}>
            <div className={css.dot0}></div>
          </div>
        </div>
        <div className={css.orbit1}>
          <div className={css.pos1}>
            <div className={css.dot1}></div>
          </div>
        </div>
        <div className={css.orbit2}>
          <div className={css.pos2}>
            <div className={css.dot2}></div>
          </div>
        </div>
        <div className={css.orbit3}>
          <div className={css.pos3}>
            <div className={css.dot3}></div>
          </div>
        </div>
      </div>  
    </div>
  );

}

export default Loader;