import React from "react";
import classNames from "classnames";
import { UploaderContext } from "../../index";
import UploaderFile from "../File";
import "./index.less";

type UploaderFilesType = {
  className?: string;
  style?: React.CSSProperties;
  fileList: Record<string, any>;
  children?: (props: { fileList: any }) => React.ReactNode;
};

export default (props: UploaderFilesType) => {
  const { className, style, fileList, children } = props;
  const { getPrefixCls } = React.useContext(UploaderContext);
  const prefixCls = getPrefixCls("files");

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {children ? (
        children({ fileList })
      ) : (
        <ul>
          {fileList.map((file: Record<string, any>) => (
            <UploaderFile key={file.id} file={file} list />
          ))}
        </ul>
      )}
    </div>
  );
};
