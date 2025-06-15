import {GitLabCommitAuthor, GitLabUser} from "./GitlabUser";

export interface GitLabProject {
  id: number;
  name: string;
  description: string | null;
  web_url: string;
  avatar_url: string | null;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  ci_config_path: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}


export interface GitLabCommit {
  id: string;
  message: string;
  title: string;
  timestamp: string;
  url: string;
  author: GitLabCommitAuthor;
}

export interface MergeParams {
  force_remove_source_branch: string;
}

export interface MergeRequestAttributes {
  assignee_id: number | null;
  assignee_ids: number[];
  author_id: number;
  created_at: string;
  description: string;
  draft: boolean;
  head_pipeline_id: number | null;
  id: number;
  iid: number;
  last_edited_at: string | null;
  last_edited_by_id: number | null;
  merge_commit_sha: string | null;
  merge_error: string | null;
  merge_params: MergeParams;
  merge_status: string;
  detailed_merge_status: string;
  merge_user_id: number | null;
  merge_when_pipeline_succeeds: boolean;
  milestone_id: number | null;
  source_branch: string;
  source_project_id: number;
  state: string;
  state_id: number;
  target_branch: string;
  target_project_id: number;
  time_estimate: number;
  time_change: number;
  total_time_spent: number;
  human_time_change: string | null;
  human_time_estimate: string | null;
  human_total_time_spent: string | null;
  title: string;
  updated_at: string;
  updated_by_id: number | null;
  prepared_at: string;
  first_contribution: boolean;
  blocking_discussions_resolved: boolean;
  labels: string[];
  reviewer_ids: number[];
  last_commit: GitLabCommit;
  source: GitLabProject;
  target: GitLabProject;
  url: string;
  work_in_progress: boolean;
  approval_rules: any[];
  action: string;
}

export interface MergeRequestChanges {
  merge_status?: {
    previous: string;
    current: string;
  };
  updated_at?: {
    previous: string;
    current: string;
  };
  prepared_at?: {
    previous: string | null;
    current: string;
  };
}

export interface GitLabRepository {
  name: string;
  url: string;
  description: string | null;
  homepage: string;
}

export interface MergeRequestWebhookEvent {
  object_kind: "merge_request";
  event_type: "merge_request";
  user: GitLabUser;
  project: GitLabProject;
  object_attributes: MergeRequestAttributes;
  labels: string[];
  changes: MergeRequestChanges;
  repository: GitLabRepository;
}
