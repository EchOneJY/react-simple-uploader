import React, { createRef, useEffect } from 'react';
import classNames from 'classnames';
import './index.css';

import { UploaderContext } from '../index';

type UploaderBtnType = {
  directory?: boolean;
  single?: boolean;
  attrs?: Record<string, any>;
} & React.HTMLAttributes<HTMLLabelElement>;

const UploaderBtn = (props: UploaderBtnType = { directory: false, single: false, attrs: {} }) => {
  const btnDom = createRef<HTMLLabelElement>();
  const contextValue = React.useContext(UploaderContext);
  const { directory, single, attrs, children } = props;

  useEffect(() => {
    const uploader = contextValue.uploader;
    uploader.assignBrowse(btnDom.current, directory, single, attrs);
  }, []);

  return (
    <label className={classNames('uploader-btn', { hidden: !contextValue.support })} ref={btnDom}>
      {children}
    </label>
  );
};

export default UploaderBtn;
