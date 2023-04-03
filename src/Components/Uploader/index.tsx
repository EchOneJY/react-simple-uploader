import React, {
  useState,
  useEffect,
  Fragment,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import SimpleUploader from "simple-uploader.js";
import classNames from "classnames";
import UploaderList from "../List";
import UploaderDrop from "../Drop";
import UploaderBtn from "../Btn";
import UploaderUnsupport from "../Unsupport";

import UploaderContext, { defaultGetPrefixCls } from "./UploaderContext";
import "./index.css";
import { camelCase } from "../../utils";

type Recordable<T = any> = Record<string, T>;

export type StatusType = {
  success: "string";
  error: "string";
  uploading: "string";
  paused: "string";
  waiting: "string";
};

export type UploaderProps = {
  options: Recordable;
  autoStart: boolean;
  fileStatusText: StatusType;
  children: (props: Recordable) => React.ReactNode;
  [key: string]: any;
  className?: string;
  style?: React.CSSProperties;
};

enum UploadEventEnum {
  FILE_ADDED_EVENT = "fileAdded",
  FILES_ADDED_EVENT = "filesAdded",
  UPLOAD_START_EVENT = "uploadStart",
}

const defaultOptions = {
  //目标上传 URL，默认POST
  target: "",
  //分块大小(单位：字节)
  chunkSize: "2048000",
  //上传文件时文件内容的参数名，对应chunk里的Multipart对象名，默认对象名为file
  fileParameterName: "file",
  //失败后最多自动重试上传次数
  maxChunkRetries: 3,
  //是否开启服务器分片校验，对应GET类型同名的target URL
  testChunks: true,
};

const { FILE_ADDED_EVENT, FILES_ADDED_EVENT, UPLOAD_START_EVENT } =
  UploadEventEnum;

export default forwardRef((props: UploaderProps, ref) => {
  const { className, style, options, fileStatusText, children } = props;

  const prefixCls = defaultGetPrefixCls("");

  const [started, setStarted] = useState(false);
  const [files, setFiles] = useState<Recordable[]>([]);
  const [fileList, setFileList] = useState<Recordable[]>([]);
  const uploaderRef = useRef(
    new SimpleUploader({ ...defaultOptions, ...options })
  );

  uploaderRef.current.fileStatusText = fileStatusText || {
    success: "上传成功",
    error: "上传失败",
    uploading: "上传中",
    paused: "暂停",
    waiting: "等待上传",
  };

  function uploadStart() {
    setStarted(true);
  }

  function fileAdded(file: Recordable) {
    if (props[camelCase(FILE_ADDED_EVENT)]) {
      props[camelCase(FILE_ADDED_EVENT)](file);
    }
    if (file.ignored) {
      // is ignored, filter it
      return false;
    }
  }

  function filesAdded(files: Recordable, fileList: Recordable) {
    if (props[camelCase(FILES_ADDED_EVENT)]) {
      props[camelCase(FILES_ADDED_EVENT)](files, fileList);
    }
    if (files.ignored || fileList.ignored) {
      // is ignored, filter it
      return false;
    }
  }

  function fileRemoved() {
    setFiles(uploaderRef.current.files);
    setFileList(uploaderRef.current.fileList);
  }

  function filesSubmitted(files: Recordable[], fileList: Recordable[]) {
    const lastFile = fileList[fileList.length - 1];
    setFiles(files);
    if (lastFile) {
      setFileList([lastFile]);
    } else {
      setFileList([]);
    }
    if (props.autoStart) {
      uploaderRef.current.upload();
    }
  }

  const eventObj: Record<string, (...args: any) => void | boolean> = {
    uploadStart,
    fileAdded,
    filesAdded,
    fileRemoved,
    filesSubmitted,
  };

  function allEvent(...args: any) {
    const name = args[0];
    const EVENTSMAP: Recordable<boolean | string> = {
      [FILE_ADDED_EVENT]: true,
      [FILES_ADDED_EVENT]: true,
      [UPLOAD_START_EVENT]: "uploadStart",
    };
    const handler = EVENTSMAP[name];
    if (handler) {
      if (handler === true) {
        return;
      }
      eventObj[handler as string](args.slice(1));
    }
    const camelCaseName = camelCase(name);
    if (props[camelCaseName]) {
      props[camelCaseName](...args.slice(1));
    }
  }

  useImperativeHandle(ref, () => ({
    getUploader: () => uploaderRef.current,
  }));

  useEffect(() => {
    uploaderRef.current.fileStatusText = fileStatusText || {
      success: "上传成功",
      error: "上传失败",
      uploading: "上传中",
      paused: "暂停",
      waiting: "等待上传",
    };

    uploaderRef.current.on("catchAll", allEvent);
    uploaderRef.current.on(FILE_ADDED_EVENT, fileAdded);
    uploaderRef.current.on(FILES_ADDED_EVENT, filesAdded);
    uploaderRef.current.on("fileRemoved", fileRemoved);
    uploaderRef.current.on("filesSubmitted", filesSubmitted);

    return () => {
      uploaderRef.current.off("catchAll", allEvent);
      uploaderRef.current.off(FILE_ADDED_EVENT, fileAdded);
      uploaderRef.current.off(FILES_ADDED_EVENT, filesAdded);
      uploaderRef.current.off("fileRemoved", fileRemoved);
      uploaderRef.current.off("filesSubmitted", filesSubmitted);
      uploaderRef.current = null;
    };
  }, []);

  return (
    <UploaderContext.Provider
      value={{
        getPrefixCls: defaultGetPrefixCls,
        uploaderRef,
        support: uploaderRef.current.support,
      }}
    >
      {
        <div
          className={classNames(`${prefixCls}-wrapper`, className)}
          style={style}
        >
          {children ? (
            children({ fileList, files, started })
          ) : (
            <Fragment>
              <UploaderUnsupport />
              <UploaderDrop>
                <p>Drop files here to upload or</p>
                <UploaderBtn>select files</UploaderBtn>
                <UploaderBtn directory>select folder</UploaderBtn>
              </UploaderDrop>
              <UploaderList fileList={fileList} />
            </Fragment>
          )}
        </div>
      }
    </UploaderContext.Provider>
  );
});
