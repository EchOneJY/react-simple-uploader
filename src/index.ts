import type { UploaderProps, StatusType } from './Uploader';
import Uploader from './Uploader';
import UploaderBtn from './Btn';
import UploaderDrop from './Drop';
import type { ProgressStyleType, FileType } from './File';
import ChunkUploadFile from './File';
import UploaderFiles from './Files';
import UploaderList from './List';
import UploaderUnsupport from './Unsupport';

export type { UploaderProps, StatusType, ProgressStyleType, FileType };

export { UploaderContext } from './Uploader/UploaderContext';

export {
  Uploader,
  UploaderBtn,
  UploaderDrop,
  ChunkUploadFile,
  UploaderFiles,
  UploaderList,
  UploaderUnsupport,
};

export default Uploader;

export { default as Foo } from './Foo';
