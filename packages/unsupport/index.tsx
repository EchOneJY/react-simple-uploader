import React, { Fragment } from 'react';
import styles from './index.less';

type UploaderUnsupportType = React.HTMLAttributes<HTMLDivElement>;

export default function UploaderUnsupport(props: UploaderUnsupportType) {
  const { children } = props;
  return (
    <div className={styles['uploader-unsupport']}>
      {children ? (
        <Fragment>{children}</Fragment>
      ) : (
        <p>
          Your browser, unfortunately, is not supported by Uploader.js. The
          library requires support for{' '}
          <a href="http://www.w3.org/TR/FileAPI/">the HTML5 File API</a> along
          with{' '}
          <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">
            file slicing
          </a>
          .
        </p>
      )}
    </div>
  );
}