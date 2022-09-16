import React, { Fragment } from "react";
import classNames from "classnames";
import "./index.less";

import { UploaderContext } from "../../index";

type UploaderUnsupportType = React.HTMLAttributes<HTMLDivElement>;

export default function UploaderUnsupport(props: UploaderUnsupportType) {
  const { className, style, children } = props;
  const { getPrefixCls, support } = React.useContext(UploaderContext);
  const prefixCls = getPrefixCls("unsupport");

  return !support ? (
    <div className={classNames(prefixCls, className)} style={style}>
      {children ? (
        <Fragment>{children}</Fragment>
      ) : (
        <p>
          Your browser, unfortunately, is not supported by Uploader.js. The
          library requires support for{" "}
          <a href="http://www.w3.org/TR/FileAPI/">the HTML5 File API</a> along
          with{" "}
          <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">
            file slicing
          </a>
          .
        </p>
      )}
    </div>
  ) : null;
}
