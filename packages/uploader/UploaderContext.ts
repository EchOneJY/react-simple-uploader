import React from 'react';

export type UploaderContextProps = {
  uploader: Recordable;
  support: boolean;
};

const UploaderContext = React.createContext<UploaderContextProps>({
  uploader: {},
  support: true,
});

export { UploaderContext };

export default UploaderContext;
