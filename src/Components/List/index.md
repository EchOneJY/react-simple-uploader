## List

文件列表

#### 使用

```ts
import { Uploader, UploaderList } from "react-simple-uploader";

<Uploader>{({ fileList }) => <UploaderList fileList={fileList} />}</Uploader>;
```

##### 参数

| 参数     | 说明     | 类型  | 可选值 | 默认值 |
| -------- | -------- | ----- | ------ | ------ |
| fielList | 文件列表 | Array | ——     | []     |

#### Render Props

List 支持接收 children 自定义渲染列表，并返回以下参数：

| 参数     | 说明     | 类型  | 可选值 | 默认值 |
| -------- | -------- | ----- | ------ | ------ |
| fielList | 文件列表 | Array | ——     | []     |
