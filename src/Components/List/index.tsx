import React from "react";
import classNames from "classnames";
import { UploaderContext } from "../../index";
import UploaderFile from "../File";
import "./index.css";

type UploaderListType = {
  className?: string;
  style?: React.CSSProperties;
  fileList: Record<string, any>;
  children?: (props: { fileList: any }) => React.ReactNode;
};

export default (props: UploaderListType) => {
  const { className, style, fileList, children } = props;
  const { getPrefixCls } = React.useContext(UploaderContext);
  const prefixCls = getPrefixCls("list");

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
