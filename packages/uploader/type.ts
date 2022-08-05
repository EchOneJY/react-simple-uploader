export type StatusType = {
  success: 'string';
  error: 'string';
  uploading: 'string';
  paused: 'string';
  waiting: 'string';
};

export type UploaderProps = {
  options: Recordable;
  autoStart: boolean;
  fileStatusText: StatusType;
  [key: string]: any;
} & React.HTMLAttributes<HTMLDivElement>;
