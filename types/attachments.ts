export interface Attachment {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "compressing" | "uploading" | "completed" | "error";
  file?: File;
  blobId?: string; 
  type?: string;
}
 