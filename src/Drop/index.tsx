import classNames from 'classnames';
import React, { createRef, useEffect, useState } from 'react';
import styles from './index.less';

import { UploaderContext } from '../index';

type UploaderDropType = React.HTMLAttributes<HTMLDivElement>;

export default function UploaderDrop(props: UploaderDropType) {
  const dropDom = createRef<HTMLDivElement>();
  const contextValue = React.useContext(UploaderContext);
  const { children } = props;

  const [dropClass, setDropClass] = useState('');

  const onDragEnter = () => setDropClass('uploader-dragover');
  const onDragLeave = () => setDropClass('');
  const onDrop = () => setDropClass('uploader-droped');

  useEffect(() => {
    const uploader = contextValue.uploader;
    uploader.assignDrop(dropDom.current);
    uploader.on('dragenter', onDragEnter);
    uploader.on('dragleave', onDragLeave);
    uploader.on('drop', onDrop);

    return () => {
      uploader.off('dragenter', onDragEnter);
      uploader.off('dragleave', onDragLeave);
      uploader.off('drop', onDrop);
      uploader.unAssignDrop(dropDom.current);
    };
  }, []);

  return (
    <div
      className={classNames(styles['uploader-drop'], dropClass)}
      ref={dropDom}
    >
      {children}
    </div>
  );
}
