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

<!-- import React, { Fragment, useRef, useEffect } from "react";
import {
  Uploader,
  UploaderUnsupport,
  UploaderDrop,
  UploaderBtn,
  UploaderList,
  UploaderFile,
} from "react-simple-uploader";
import SparkMD5 from "spark-md5";
import { message } from "antd";

export default () => {
  const uploaderRef = useRef(null);

  const uploadOptions = {
    target: `/api/ent/web/asyncLog/chunk`,
    //失败后最多自动重试上传次数
    maxChunkRetries: 3,
    checkChunkUploadedByResponse: (chunk: any, obj: any) => {
      const objMessage = JSON.parse(obj);
      console.log("文件块上传结果：", objMessage);
      if (objMessage && objMessage.code === 200) {
        const res = objMessage.data;
        if (res) {
          if (res.skipUpload) {
            return true;
          }
          return (res.uploaded || []).indexOf(chunk.offset + 1) >= 0;
        }
        return false;
      } else {
        message.error(objMessage.message || "上传服务出错");
        const uploader = (
          uploaderRef.current as UploaderRefType
        )?.getUploader();
        if (uploader) {
          uploader.cancel();
        }
        return false;
      }
    },
  };

  /**
   * 计算md5，实现断点续传及秒传
   * @param file
   */
  function computeMD5(file) {
    file.pause();

    //单个文件的大小限制2G
    const fileSizeLimit = 2 * 1024 * 1024 * 1024;
    // console.log('文件大小：' + file.size)
    // console.log('限制大小：' + fileSizeLimit)
    if (file.size > fileSizeLimit) {
      message.warning("文件大小不能超过2G");
      file.ignored = true;
      file.cancel();
      return;
    }

    const fileReader = new FileReader();
    const time = new Date().getTime();
    const blobSlice = File.prototype.slice;
    let currentChunk = 0;
    const chunkSize = 10 * 1024 * 1000;
    const chunks = Math.ceil(file.size / chunkSize);
    const spark = new SparkMD5.ArrayBuffer();
    //由于计算整个文件的Md5太慢，因此采用只计算第1块文件的md5的方式
    const chunkNumberMD5 = 1;

    loadNext();

    fileReader.onload = (e) => {
      spark.append(e.target.result);

      if (currentChunk < chunkNumberMD5) {
        loadNext();
      } else {
        const md5 = spark.end();
        file.uniqueIdentifier = md5;
        file.resume();
        console.log(
          `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
            file.size
          } 用时：${new Date().getTime() - time} ms`
        );
      }
    };

    fileReader.onerror = function () {
      console.log(`文件${file.name}读取出错，请检查该文件`);
      file.cancel();
    };

    function loadNext() {
      const start = currentChunk * chunkSize;
      const end =
        start + chunkSize >= file.size ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
      currentChunk++;
      console.log("计算第" + currentChunk + "块");
    }
  }

  function onFileAdded(file) {
    computeMD5(file);
  }

  function onFileSuccess(rootFile, file) {
    console.log("rootFile", rootFile);
  }

  function hanleDeleteFile() {
    const uploader = uploaderRef.current?.getUploader();
    if (uploader) {
      uploader.cancel();
    }
  }

  return (
    <Uploader
      className="uploader"
      ref={uploaderRef}
      onFileSuccess={onFileSuccess}
      onFileAdded={onFileAdded}
      options={uploadOptions}
    >
      {({ fileList }) => (
        <Fragment>
          <UploaderUnsupport />
          <UploaderDrop className="uploader-drop">
            <UploaderBtn className="uploader-btn" attrs={{ accept: [".zip"] }}>
              上传文件
            </UploaderBtn>
          </UploaderDrop>
          <UploaderList className="uploader-list" fileList={fileList}>
            {({ fileList: list }) => {
              return list.map((file) => (
                <li key={file.id}>
                  <UploaderFile file={file} />
                  {file.completed && (
                    <span
                      className="icon-file-delete"
                      onClick={hanleDeleteFile}
                    >
                      X
                    </span>
                  )}
                </li>
              ));
            }}
          </UploaderList>
        </Fragment>
      )}
    </Uploader>
  );
}; -->
