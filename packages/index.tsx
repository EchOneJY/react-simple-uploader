import type { UploaderProps, StatusType } from './uploader';
import ChunkUploader from './uploader';
import UploaderBtn from './btn';
import UploaderDrop from './drop';
import type { ProgressStyleType, FileType } from './file';
import ChunkUploadFile from './file';
import UploaderFiles from './files';
import UploaderList from './list';
import UploaderUnsupport from './unsupport';

export type { UploaderProps, StatusType, ProgressStyleType, FileType };

export { UploaderContext } from './uploader/UploaderContext';

export {
  UploaderBtn,
  UploaderDrop,
  ChunkUploadFile,
  UploaderFiles,
  UploaderList,
  UploaderUnsupport,
};

export default ChunkUploader;
