import React, { createRef, useEffect } from 'react';
import styles from './index.less';

import { UploaderContext } from '../index';

type UploaderBtnType = {
  directory?: boolean;
  single?: boolean;
  attrs?: Recordable;
} & React.HTMLAttributes<HTMLDivElement>;

const UploaderBtn = (
  props: UploaderBtnType = { directory: false, single: false, attrs: {} },
) => {
  const btnDom = createRef<HTMLDivElement>();
  const contextValue = React.useContext(UploaderContext);
  const { directory, single, attrs, children } = props;

  useEffect(() => {
    const uploader = contextValue.uploader;
    uploader.assignDrop(btnDom.current, directory, single, attrs);
  }, []);

  return (
    <div className={styles['uploader-btn']} ref={btnDom}>
      {children}
    </div>
  );
};

export default UploaderBtn;
