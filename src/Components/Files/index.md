## Files

文件列表

#### 使用

```ts
import { Uploader, UploaderFiles } from "react-simple-uploader";

<Uploader>{({ fileList }) => <UploaderFiles fileList={fileList} />}</Uploader>;
```

##### 参数

| 参数     | 说明     | 类型  | 可选值 | 默认值 |
| -------- | -------- | ----- | ------ | ------ |
| fielList | 文件列表 | Array | ——     | []     |

#### Render Props

Files 支持接收 children 自定义渲染列表，并返回以下参数：

| 参数     | 说明     | 类型  | 可选值 | 默认值 |
| -------- | -------- | ----- | ------ | ------ |
| fielList | 文件列表 | Array | ——     | []     |
