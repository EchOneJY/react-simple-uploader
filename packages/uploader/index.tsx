import React, { useState, useEffect, Fragment } from 'react';

import Uploader from 'simple-uploader.js';

import UploaderList from '../list';
import UploaderDrop from '../drop';
import UploaderBtn from '../btn';
import UploaderUnsupport from '../unsupport';

import type { UploaderProps } from './type';
import UploaderContext from './UploaderContext';
import styles from './index.less';
import { camelCase } from '../utils';

enum UploadEventEnum {
  FILE_ADDED_EVENT = 'fileAdded',
  FILES_ADDED_EVENT = 'filesAdded',
  UPLOAD_START_EVENT = 'uploadStart',
}

const defaultOptions = {
  //目标上传 URL，默认POST
  target: '',
  //分块大小(单位：字节)
  chunkSize: '2048000',
  //上传文件时文件内容的参数名，对应chunk里的Multipart对象名，默认对象名为file
  fileParameterName: 'file',
  //失败后最多自动重试上传次数
  maxChunkRetries: 3,
  //是否开启服务器分片校验，对应GET类型同名的target URL
  testChunks: true,
};

const { FILE_ADDED_EVENT, FILES_ADDED_EVENT, UPLOAD_START_EVENT } =
  UploadEventEnum;

const ChunkUploader = React.forwardRef((props: UploaderProps) => {
  const { options, fileStatusText, children } = props;

  const [uploader, setUploader] = useState<Recordable>({});
  const [started, setStarted] = useState(false);
  const [files, setFiles] = useState<Recordable[]>([]);
  const [fileList, setFileList] = useState<Recordable[]>([]);

  const curUploader = new Uploader({ ...defaultOptions, ...options });
  curUploader.fileStatusText = fileStatusText || {
    success: '上传成功',
    error: '上传失败',
    uploading: '上传中',
    paused: '暂停',
    waiting: '等待上传',
  };

  setUploader(curUploader);

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
    setFiles(uploader.files);
    setFileList(uploader.fileList);
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
      uploader.upload();
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
      [UPLOAD_START_EVENT]: 'uploadStart',
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

  uploader.on('catchAll', allEvent);
  uploader.on(FILE_ADDED_EVENT, fileAdded);
  uploader.on(FILES_ADDED_EVENT, filesAdded);
  uploader.on('fileRemoved', fileRemoved);
  uploader.on('filesSubmitted', filesSubmitted);

  useEffect(() => {
    // const uploaderInner = uploader.uploader;
    return () => {
      uploader.off('catchAll', allEvent);
      uploader.off(FILE_ADDED_EVENT, fileAdded);
      uploader.off(FILES_ADDED_EVENT, filesAdded);
      uploader.off('fileRemoved', fileRemoved);
      uploader.off('filesSubmitted', filesSubmitted);
      setUploader({});
    };
  }, []);

  return (
    <UploaderContext.Provider
      value={{ uploader, support: uploader.uploader.support }}
    >
      {
        <div className={styles.uploader}>
          {children ? (
            React.cloneElement(children as JSX.Element, {
              fileList,
              files,
              started,
            })
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

export default ChunkUploader;
