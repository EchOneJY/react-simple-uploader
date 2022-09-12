## File

上传文件

#### 使用

```tsx
import React, { Fragment } from "react";
import {
  Uploader,
  UploaderList,
  UploaderFile,
  UploaderDrop,
  UploaderBtn,
} from "react-simple-uploader";

export default () => {
  return (
    <Uploader>
      {({ fileList }) => (
        <Fragment>
          <UploaderDrop>
            <p>拖拽文件上传</p>
            <UploaderBtn>上传文件</UploaderBtn>
            <UploaderBtn directory>上传文件夹</UploaderBtn>
          </UploaderDrop>
          <UploaderList fileList={fileList}>
            {({ fileList }) => {
              return fileList.map((file) => (
                <UploaderFile file={file} list>
                  {({
                    file,
                    list,
                    status,
                    paused,
                    error,
                    response,
                    averageSpeed,
                    formatedAverageSpeed,
                    currentSpeed,
                    isComplete,
                    isUploading,
                    size,
                    formatedSize,
                    uploadedSize,
                    progress,
                    progressStyle,
                    progressingClass,
                    timeRemaining,
                    formatedTimeRemaining,
                    type,
                    extension,
                    fileCategory,
                  }) => {
                    ({ file }) => (
                      <Fragment>
                        <div
                          className={classNames(
                            "uploader-file-progress",
                            progressingClass
                          )}
                          style={{ ...progressStyle }}
                        />
                        <div className="uploader-file-info">
                          <div className="uploader-file-name">
                            <i className={classNames("uploader-file-icon")} />
                            {file.name || ""}
                          </div>
                          <div className="uploader-file-size">
                            {formatedSize}
                          </div>
                          <div className="uploader-file-meta" />
                        </div>
                      </Fragment>
                    );
                  }}
                </UploaderFile>
              ));
            }}
          </UploaderList>
        </Fragment>
      )}
    </Uploader>
  );
};
```

#### 示例

```ts
import React, { Fragment } from "react";
import {
  Uploader,
  UploaderList,
  UploaderFile,
  UploaderDrop,
  UploaderBtn,
} from "react-simple-uploader";

export default () => {
  return (
    <Uploader>
      {({ fileList }) => (
        <Fragment>
          <UploaderDrop>
            <p>拖拽文件上传</p>
            <UploaderBtn>上传文件</UploaderBtn>
            <UploaderBtn directory>上传文件夹</UploaderBtn>
          </UploaderDrop>
          <UploaderList fileList={fileList}>
            {({ fileList }) => {
              return fileList.map((file) => (
                <UploaderFile file={file} list>
                  {({
                    file,
                    list,
                    status,
                    paused,
                    error,
                    response,
                    averageSpeed,
                    formatedAverageSpeed,
                    currentSpeed,
                    isComplete,
                    isUploading,
                    size,
                    formatedSize,
                    uploadedSize,
                    progress,
                    progressStyle,
                    progressingClass,
                    timeRemaining,
                    formatedTimeRemaining,
                    type,
                    extension,
                    fileCategory,
                  }) => {
                    ({ file }) => (
                      <Fragment>
                        <div
                          className={classNames(
                            "uploader-file-progress",
                            progressingClass
                          )}
                          style={{ ...progressStyle }}
                        />
                        <div className="uploader-file-info">
                          <div className="uploader-file-name">
                            <i className={classNames("uploader-file-icon")} />
                            {file.name || ""}
                          </div>
                          <div className="uploader-file-size">
                            {formatedSize}
                          </div>
                          <div className="uploader-file-meta" />
                        </div>
                      </Fragment>
                    );
                  }}
                </UploaderFile>
              ));
            }}
          </UploaderList>
        </Fragment>
      )}
    </Uploader>
  );
};
```

##### 参数

| 参数 | 说明                       | 类型    | 可选值 | 默认值 |
| ---- | -------------------------- | ------- | ------ | ------ |
| file | 文件                       | object  | ——     |        |
| list | 是否为 UploaderList 子组件 | boolean | ——     |        |

#### Render Props

List 支持接收 children 自定义渲染列表，并返回以下参数：

| 参数                  | 说明                       | 类型    | 可选值                                         | 默认值 |
| --------------------- | -------------------------- | ------- | ---------------------------------------------- | ------ |
| file                  | 文件                       | object  | ——                                             |        |
| list                  | 是否为 UploaderList 子组件 | string  | ——                                             |        |
| status                | 当前上传状态               | String  | success, error, uploading, paused, waiting     |        |
| paused                | 文件上传是否暂停           | boolean | ——                                             |        |
| error                 | 文件上传是否出错           | boolean | ——                                             |        |
| response              | 文件上传服务端返回         | object  | ——                                             |        |
| averageSpeed          | 平均上传速度               | number  | ——                                             |        |
| formatedAverageSpeed  | 平均上传速度格式花         | string  | ——                                             |        |
| currentSpeed          | 当前上传速度               | number  | ——                                             |        |
| isComplete            | 是否上传完成               | boolean | ——                                             |        |
| isUploading           | 是否上传中                 | boolean | ——                                             |        |
| size                  | 上传文件大小               | number  | ——                                             |        |
| formatedSize          | 上传文件大小格式花         | string  | ——                                             |        |
| uploadedSize          | 已上传文件大小             | number  | ——                                             |        |
| progress              | 上传进度值                 | number  | 0-1                                            |        |
| progressStyle         | 上传进度样式               | string  | ——                                             |        |
| progressingClass      | 上传进度 Class             | string  | ——                                             |        |
| timeRemaining         | 剩余上传时间               | number  | ——                                             |        |
| formatedTimeRemaining | 剩余上传时间格式化         | string  | ——                                             |        |
| type                  | 上传文件类型               | string  | ——                                             |        |
| extension             | 上传文件类型后缀           | string  | ——                                             |        |
| fileCategory          | 上传文件类型               | string  | folder, document, video, audio, image, unknown |        |
