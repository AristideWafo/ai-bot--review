export interface GitLabUser {
    id: number;
    name: string;
    username: string;
    avatar_url: string;
    email?: string; // souvent masqué
}

export interface GitLabCommitAuthor {
    name: string;
    email: string;
}