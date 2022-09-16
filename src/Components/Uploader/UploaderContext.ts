import React from "react";

export type UploaderContextProps = {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  uploaderRef?: React.MutableRefObject<Record<string, any> | null>;
  support: boolean;
};

export const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string
) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `rsu-${suffixCls}` : "rsu";
};

const UploaderContext = React.createContext<UploaderContextProps>({
  getPrefixCls: () => "",
  support: true,
});

export { UploaderContext };

export default UploaderContext;
