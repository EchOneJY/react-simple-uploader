import React from 'react';
import UploaderFile from '../file';
import styles from './index.less';

type UploaderFilesType = {
  fileList: Recordable;
} & React.HTMLAttributes<HTMLDivElement>;

export default function UploaderFiles(props: UploaderFilesType) {
  const { fileList, children } = props;
  return (
    <div className={styles['uploader-list']}>
      {children ? (
        React.cloneElement(props.children as JSX.Element, {
          fileList,
        })
      ) : (
        <ul>
          {fileList.map((file: Recordable) => (
            <UploaderFile key={file.id} file={file} list />
          ))}
        </ul>
      )}
    </div>
  );
}
