import { DiffRefs } from "./MergeRequestComment";
import { FileDiff } from "./FileDiff";
import { GitLabUser } from "./MergeRequestWebhookEvent";

export interface MergeRequestChangesResponse {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  merged_by: GitLabUser; // null ou objet utilisateur
  merge_user: GitLabUser; // null ou objet utilisateur
  merged_at: string | null;
  closed_by: GitLabUser; // null ou objet utilisateur
  closed_at: string | null;
  target_branch: string;
  source_branch: string;
  user_notes_count: number;
  upvotes: number;
  downvotes: number;
  author: GitLabUser;
  assignees: GitLabUser[];
  assignee: GitLabUser | null;
  reviewers: GitLabUser[];
  source_project_id: number;
  target_project_id: number;
  labels: string[];
  draft: boolean;
  imported: boolean;
  imported_from: string;
  work_in_progress: boolean;
  milestone: any; // null ou objet milestone
  merge_when_pipeline_succeeds: boolean;
  merge_status: string;
  detailed_merge_status: string;
  merge_after: string | null;
  sha: string;
  merge_commit_sha: string | null;
  squash_commit_sha: string | null;
  discussion_locked: boolean | null;
  should_remove_source_branch: boolean | null;
  force_remove_source_branch: boolean;
  prepared_at: string;
  reference: string;
  references: {
    short: string;
    relative: string;
    full: string;
  };
  web_url: string;
  time_stats: {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate: string | null;
    human_total_time_spent: string | null;
  };
  squash: boolean;
  squash_on_merge: boolean;
  task_completion_status: {
    count: number;
    completed_count: number;
  };
  has_conflicts: boolean;
  blocking_discussions_resolved: boolean;
  approvals_before_merge: number | null;
  subscribed: boolean;
  changes_count: string;
  latest_build_started_at: string | null;
  latest_build_finished_at: string | null;
  first_deployed_to_production_at: string | null;
  pipeline: any; // null ou objet pipeline
  head_pipeline: any; // null ou objet pipeline
  diff_refs: DiffRefs;
  merge_error: string | null;
  user: {
    can_merge: boolean;
  };
  changes: FileDiff[];
  overflow: boolean;
}
