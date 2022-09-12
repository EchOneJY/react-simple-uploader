import classNames from "classnames";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Uploader from "simple-uploader.js";
import { secondsToStr } from "../../utils";
import events from "./file-events";
import "./index.css";

export type ProgressStyleType = {
  progress?: string;
  WebkitTransform?: string;
  MozTransform?: string;
  msTransform?: string;
  transform?: string;
};

type Recordable<T = any> = Record<string, T>;

export type FileType = {
  file: Recordable;
  list: boolean;
  children?: (props: Recordable) => React.ReactNode;
};

export default function ChunkUploadFile(props: FileType) {
  const { file, list = true, children } = props;

  let handlers: Recordable = {};
  const tid = useRef<any>(null);

  const [iconType, setIconType] = useState("");
  const [status, setStatus] = useState("");
  const [statusText, setStatusText] = useState("");
  const [progressStyle, setProgressStyle] = useState<ProgressStyleType>({});
  const [progressingClass, setProgressingClass] = useState("");
  const [formatedAverageSpeed, setFormatedAverageSpeed] = useState("");
  const [formatedTimeRemaining, setFormatedTimeRemaining] = useState("");
  const [response, setResponse] = useState("");
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [size, setSize] = useState(0);
  const [formatedSize, setFormatedSize] = useState("");
  const [uploadedSize, setUploadedSize] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [type, setType] = useState("");
  const [extension, setExtension] = useState("");

  function fileCategory() {
    const isFolder = file.isFolder;
    let type = isFolder ? "folder" : "unknown";
    const categoryMap = file.uploader.opts.categoryMap;
    const typeMap = categoryMap || {
      image: ["gif", "jpg", "jpeg", "png", "bmp", "webp"],
      video: ["mp4", "m3u8", "rmvb", "avi", "swf", "3gp", "mkv", "flv"],
      audio: ["mp3", "wav", "wma", "ogg", "aac", "flac"],
      document: [
        "doc",
        "txt",
        "docx",
        "pages",
        "epub",
        "pdf",
        "numbers",
        "csv",
        "xls",
        "xlsx",
        "keynote",
        "ppt",
        "pptx",
      ],
    };
    Object.keys(typeMap).forEach((_type) => {
      const extensions = typeMap[_type];
      if (extensions.indexOf(extension) > -1) {
        type = _type;
      }
    });
    setIconType(type);
  }
  useEffect(() => {
    fileCategory();
  }, [file]);

  function getStatusText() {
    if (isComplete) {
      setStatus("success");
    } else if (error) {
      setStatus("error");
    } else if (isUploading) {
      setStatus("uploading");
    } else if (paused) {
      setStatus("paused");
    } else {
      setStatus("waiting");
    }
    const fileStatusText = file.uploader.fileStatusText;
    let txt = status;
    if (typeof fileStatusText === "function") {
      txt = fileStatusText(status, response);
    } else {
      txt = fileStatusText[status];
    }
    setStatusText(txt);
  }
  useEffect(() => {
    getStatusText();
  }, [isComplete, isUploading, error, paused, status]);

  function getProgressStyle() {
    const curProgress = Math.floor(progress * 100);
    const style = `translateX(${Math.floor(curProgress - 100)}%)`;
    console.log("progress", style);
    setProgressStyle({
      progress: `${curProgress}%`,
      WebkitTransform: style,
      MozTransform: style,
      msTransform: style,
      transform: style,
    });
  }
  useEffect(() => {
    getProgressStyle();
  }, [progress]);

  function getProgressClass() {
    if (status === "uploading") {
      tid.current = setTimeout(() => {
        setProgressingClass("uploader-file-progressing");
      }, 200);
    } else {
      clearTimeout(tid.current);
      setProgressingClass("");
    }
  }
  useEffect(() => {
    getProgressClass();
  }, [status]);

  function getFormatedAverageSpeed() {
    setFormatedAverageSpeed(`${Uploader.utils.formatSize(averageSpeed)} / s`);
  }
  useEffect(() => {
    getFormatedAverageSpeed();
  }, [averageSpeed]);

  function getFormatedTimeRemaining() {
    if (timeRemaining === Number.POSITIVE_INFINITY || timeRemaining === 0) {
      return "";
    }
    let parsedTimeRemaining = secondsToStr(timeRemaining);
    const parseTimeRemaining = file.uploader.opts.parseTimeRemaining;
    if (parseTimeRemaining) {
      parsedTimeRemaining = parseTimeRemaining(
        timeRemaining,
        parsedTimeRemaining
      );
    }
    setFormatedTimeRemaining(parsedTimeRemaining);
  }
  useEffect(() => {
    getFormatedTimeRemaining();
  }, [timeRemaining]);

  function _actionCheck() {
    setPaused(file.paused);
    setError(file.error);
    setIsUploading(file.isUploading());
  }

  function processResponse(message: string) {
    let res = message;
    try {
      res = JSON.parse(message);
    } catch (e) {}
    setResponse(res);
  }

  function _fileProgress() {
    setProgress(file.progress());
    setAverageSpeed(file.averageSpeed);
    setCurrentSpeed(file.currentSpeed);
    setTimeRemaining(file.timeRemaining());
    setUploadedSize(file.sizeUploaded());
    _actionCheck();
  }

  function _fileSuccess(
    rootFile?: Recordable,
    file?: Recordable,
    message?: string
  ) {
    console.log("_fileSuccess");
    if (rootFile && message) {
      processResponse(message);
    }
    _fileProgress();
    setError(false);
    setIsComplete(true);
    setIsUploading(false);
  }

  function _fileComplete() {
    _fileSuccess();
  }

  function _fileError(
    rootFile?: Recordable,
    file?: Recordable,
    message?: string
  ) {
    if (message) processResponse(message);
    _fileProgress();
    setError(true);
    setIsComplete(false);
    setIsUploading(false);
  }

  function pause() {
    file.pause();
    _actionCheck();
    _fileProgress();
  }

  function resume() {
    file.resume();
    _actionCheck();
  }

  function remove() {
    file.cancel();
  }

  function retry() {
    file.retry();
    _actionCheck();
  }

  const eventObj: Recordable = {
    _fileProgress,
    _fileSuccess,
    _fileComplete,
    _fileError,
  };

  function fileEventsHandler(event: string, args: any) {
    const rootFile = args[0];
    const target = list ? rootFile : args[1];
    if (file === target) {
      if (list && event === "fileSuccess") {
        processResponse(args[2]);
        return;
      }
      eventObj[`_${event}`](args);
    }
  }

  useEffect(() => {
    const staticProps = [
      {
        key: "paused",
        setState: setPaused,
      },
      {
        key: "error",
        setState: setError,
      },
      {
        key: "averageSpeed",
        setState: setAverageSpeed,
      },
      {
        key: "currentSpeed",
        setState: setCurrentSpeed,
      },
    ];
    const fnProps = [
      {
        key: "isComplete",
        setState: setIsComplete,
      },
      {
        key: "isUploading",
        setState: setIsUploading,
      },
      {
        key: "size",
        setState: setSize,
        fn: "getSize",
      },
      {
        key: "formatedSize",
        setState: setFormatedSize,
        fn: "getFormatSize",
      },
      {
        key: "uploadedSize",
        setState: setUploadedSize,
        fn: "sizeUploaded",
      },
      {
        key: "progress",
        setState: setProgress,
      },
      {
        key: "timeRemaining",
        setState: setTimeRemaining,
      },
      {
        key: "type",
        fn: "getType",
        setState: setType,
      },
      {
        key: "extension",
        fn: "getExtension",
        setState: setExtension,
      },
    ];

    staticProps.forEach((item) => {
      item.setState(file[item.key]);
    });

    fnProps.forEach((fnProp) => {
      if (fnProp.fn) {
        fnProp.setState(file[fnProp.fn]());
      } else {
        fnProp.setState(file[fnProp.key]());
      }
    });

    const eventHandler = (event: string) => {
      handlers[event] = (...args: any) => {
        fileEventsHandler(event, args);
      };
      return handlers[event];
    };
    events.forEach((event) => {
      file.uploader.on(event, eventHandler(event));
    });

    return () => {
      events.forEach((event) => {
        file.uploader.off(event, handlers[event]);
      });
      handlers = {};
    };
  }, []);

  return (
    <div className={classNames("uploader-file", status)}>
      {children ? (
        children({
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
        })
      ) : (
        <Fragment>
          <div
            className={classNames("uploader-file-progress", progressingClass)}
            style={{ ...progressStyle }}
          />
          <div className="uploader-file-info">
            <div className="uploader-file-name">
              <i className={classNames("uploader-file-icon", iconType)} />
              {file.name || ""}
            </div>
            <div className="uploader-file-size">{formatedSize}</div>
            <div className="uploader-file-meta" />
            <div className="uploader-file-status">
              {status !== "uploading" ? <span>{statusText}</span> : null}
              {status === "uploading" ? (
                <span>
                  <span>{progressStyle.progress} </span>
                  <em>{formatedAverageSpeed} </em>
                  <i>{formatedTimeRemaining}</i>
                </span>
              ) : null}
            </div>
            <div className="uploader-file-actions">
              <span className="uploader-file-pause" onClick={pause} />
              <span className="uploader-file-resume" onClick={resume} />
              <span className="uploader-file-retry" onClick={retry} />
              <span className="uploader-file-remove" onClick={remove} />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
