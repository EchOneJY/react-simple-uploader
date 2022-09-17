import type { UploaderProps, StatusType } from "./Components/Uploader";
import Uploader from "./Components/Uploader";
import type { ProgressStyleType, FileType } from "./Components/File";

export type { UploaderProps, StatusType, ProgressStyleType, FileType };

export { UploaderContext } from "./Components/Uploader/UploaderContext";

export { default as UploaderBtn } from "./Components/Btn";
export { default as UploaderDrop } from "./Components/Drop";
export { default as ChunkUploadFile } from "./Components/File";
export { default as UploaderFiles } from "./Components/Files";
export { default as UploaderList } from "./Components/List";
export { default as UploaderFile } from "./Components/File";
export { default as UploaderUnsupport } from "./Components/Unsupport";

export { Uploader };

export default Uploader;
