// Ligne dans le diff
import {DiffRefs} from "./FileDiff";

export interface LinePosition {
  line_code: string;
  type: "new" | "old";
  old_line: number | null;
  new_line: number | null;
}

// Plage de lignes (ex: pour un commentaire multiligne)
export interface LineRange {
  start: LinePosition;
  end: LinePosition;
}

// Informations de position d’un commentaire GitLab
export interface CommentPosition {
  base_sha: string;
  start_sha: string;
  head_sha: string;
  old_path?: string;
  new_path: string;
  position_type: "text";
  old_line?: number | null;
  new_line: number;
  line_range?: LineRange;
}

// Objet principal de commentaire GitLab
export interface GitLabComment {
  body: string;
  position: CommentPosition;
}



// Données nécessaires à la création d’un commentaire via API
export class GitLabCommentInput {
  projectId: string | number;
  mergeRequestIid: string | number;
  filePath: string;
  lineNumber: number; // ligne de fin (incluse)
  startLineNumber?: number; // ligne de début (facultatif, peut être = lineNumber)
  comment: string;
  diffRefs: DiffRefs;

  constructor(params: {
    projectId: string | number;
    mergeRequestIid: string | number;
    filePath: string;
    lineNumber: number;
    startLineNumber?: number;
    comment: string;
    diffRefs: DiffRefs;
  }) {
    this.projectId = params.projectId;
    this.mergeRequestIid = params.mergeRequestIid;
    this.filePath = params.filePath;
    this.lineNumber = params.lineNumber;
    this.startLineNumber = params.startLineNumber ?? params.lineNumber;
    this.comment = params.comment;
    this.diffRefs = params.diffRefs;
  }
}
