import React from "react";
import UploaderFile from "../File";
import "./index.css";

type UploaderFilesType = {
  fileList: Record<string, any>;
  children?: (props: { fileList: any }) => React.ReactNode;
};

export default function UploaderFiles(props: UploaderFilesType) {
  const { fileList, children } = props;
  return (
    <div className="uploader-list">
      {children ? (
        children({ fileList })
      ) : (
        <ul>
          {fileList.map((file: Record<string, any>) => (
            <UploaderFile key={file.id} file={file} list />
          ))}
        </ul>
      )}
    </div>
  );
}
