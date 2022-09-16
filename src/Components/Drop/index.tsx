import classNames from "classnames";
import React, { createRef, useEffect, useState } from "react";
import "./index.less";

import { UploaderContext } from "../../index";

type UploaderDropType = React.HTMLAttributes<HTMLDivElement>;

export default function UploaderDrop(props: UploaderDropType) {
  const dropDom = createRef<HTMLDivElement>();
  const { getPrefixCls, uploaderRef, support } =
    React.useContext(UploaderContext);
  const prefixCls = getPrefixCls("drop");
  const { className, style, children } = props;

  const [dropClass, setDropClass] = useState("");

  const onDragEnter = () => setDropClass(`${prefixCls}-dragover`);
  const onDragLeave = () => setDropClass("");
  const onDrop = () => setDropClass(`${prefixCls}-droped`);

  useEffect(() => {
    let uploader = uploaderRef?.current;
    uploader?.assignDrop(dropDom.current);
    uploader?.on("dragenter", onDragEnter);
    uploader?.on("dragleave", onDragLeave);
    uploader?.on("drop", onDrop);

    return () => {
      uploader?.off("dragenter", onDragEnter);
      uploader?.off("dragleave", onDragLeave);
      uploader?.off("drop", onDrop);
      if (dropDom.current) {
        uploader?.unAssignDrop(dropDom.current);
      }
      uploader = null;
    };
  }, []);

  return (
    <div
      className={classNames(
        prefixCls,
        dropClass,
        {
          [`${prefixCls}-hidden`]: !support,
        },
        className
      )}
      style={style}
      ref={dropDom}
    >
      {children}
    </div>
  );
}
