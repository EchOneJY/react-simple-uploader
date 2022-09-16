## Example

示例:

```tsx
import React, { Fragment, useRef, useEffect } from "react";
import {
  Uploader,
  UploaderUnsupport,
  UploaderDrop,
  UploaderBtn,
  UploaderList,
} from "react-simple-uploader";

export default () => {
  const uploader = useRef(null);

  useEffect(() => {
    console.log(uploader);
  }, []);
  return (
    <Uploader ref={uploader}>
      {({ fileList }) => (
        <Fragment>
          <UploaderUnsupport />
          <UploaderDrop>
            <p>拖拽文件上传</p>
            <UploaderBtn>上传文件</UploaderBtn>
            <UploaderBtn directory>上传文件夹</UploaderBtn>
          </UploaderDrop>
          <UploaderList fileList={fileList} />
        </Fragment>
      )}
    </Uploader>
  );
};
```

#### 使用

```ts
import React, { Fragment, useRef, useEffect } from "react";
import {
  Uploader,
  UploaderUnsupport,
  UploaderDrop,
  UploaderBtn,
  UploaderList,
} from "react-simple-uploader";

export default () => {
  const uploader = useRef(null);

  useEffect(() => {
    console.log(uploader);
  }, []);
  return (
    <Uploader ref={uploader}>
      {({ fileList }) => (
        <Fragment>
          <UploaderUnsupport />
          <UploaderDrop>
            <p>拖拽文件上传</p>
            <UploaderBtn>上传文件</UploaderBtn>
            <UploaderBtn directory>上传文件夹</UploaderBtn>
          </UploaderDrop>
          <UploaderList fileList={fileList} />
        </Fragment>
      )}
    </Uploader>
  );
};
```
