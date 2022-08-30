import React from 'react';

export type UploaderContextProps = {
  uploader: Record<string, any>;
  support: boolean;
};

const UploaderContext = React.createContext<UploaderContextProps>({
  uploader: {},
  support: true,
});

export { UploaderContext };

export default UploaderContext;
