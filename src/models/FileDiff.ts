export interface FileDiff {
  old_path: string;
  new_path: string;
  a_mode?: string;
  b_mode?: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
  diff: string;
}

// Références de diff utilisées pour commenter
export interface DiffRefs {
  base_sha: string;
  start_sha: string;
  head_sha: string;
}