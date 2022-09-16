import React, { createRef, useEffect } from "react";
import classNames from "classnames";
import "./index.css";

import { UploaderContext } from "../../index";

type UploaderBtnType = {
  directory?: boolean;
  single?: boolean;
  attrs?: Record<string, any>;
} & React.HTMLAttributes<HTMLLabelElement>;

const UploaderBtn = (
  props: UploaderBtnType = { directory: false, single: false, attrs: {} }
) => {
  const btnDom = createRef<HTMLLabelElement>();
  const { getPrefixCls, uploaderRef, support } =
    React.useContext(UploaderContext);
  const { className, style, directory, single, attrs, children } = props;

  const prefixCls = getPrefixCls("btn");

  useEffect(() => {
    uploaderRef?.current?.assignBrowse(
      btnDom.current,
      directory,
      single,
      attrs
    );
  }, []);

  return (
    <label
      className={classNames(
        prefixCls,
        {
          [`${prefixCls}-hidden`]: !support,
        },
        className
      )}
      style={style}
      ref={btnDom}
    >
      {children}
    </label>
  );
};

export default UploaderBtn;
