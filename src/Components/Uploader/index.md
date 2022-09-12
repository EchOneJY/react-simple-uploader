## Uploader

示例:

```tsx
import React from "react";
import ChunkUploader from "react-simple-uploader";

export default () => <ChunkUploader />;
```

#### 使用

```ts
import React from "react";
import ChunkUploader from "react-simple-uploader";

export default () => <ChunkUploader />;
```

#### 参数

| 参数           | 说明               | 类型    | 可选值 | 默认值 |
| -------------- | ------------------ | ------- | ------ | ------ |
| options        | 文件上传配置项     | object  | ——     |        |
| fileStatusText | 上传状态文本格式化 | object  | ——     |        |
| autoStart      | 是否自动开始上传   | boolean | ——     | true   |

#### options

具体可查看 [simple-uploader.js options](https://github.com/simple-uploader/Uploader#configuration)

| 参数              | 说明                                                         | 类型    | 可选值 | 默认值       |
| ----------------- | ------------------------------------------------------------ | ------- | ------ | ------------ |
| target            | 上传 URL                                                     | string  | ——     | /            |
| headers           | 请求头配置                                                   | object  | ——     | {}           |
| chunkSize         | 分块大小(单位：字节)                                         | string  | ——     | 1024 \* 1024 |
| fileParameterName | 上传文件时文件内容的参数名，对应 chunk 里的 Multipart 对象名 | string  | ——     | file         |
| maxChunkRetries   | 失败后最多自动重试上传次数                                   | number  | ——     | 0            |
| testChunks        | 是否开启服务器分片校验，对应 GET 类型同名的 target URL       | boolean | ——     | true         |

#### 事件

具体可查看 [simple-uploader.js events](https://github.com/simple-uploader/Uploader#events)
