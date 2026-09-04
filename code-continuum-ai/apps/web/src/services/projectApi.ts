import { getStoredToken } from './api';

const API_BASE_URL = '/api/v1';

export interface Repository {
  id: string;
  project_id: string;
  provider: string;
  name: string;
  default_branch: string;
  visibility: string;
  url: string | null;
  sync_status: string;
  created_at: string;
}

export interface Project {
  id: string;
  organization_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  primary_language: string;
  status: string;
  continuity_score: number;
  health_score: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  repositories: Repository[];
}

export interface ProjectCreate {
  name: string;
  description?: string;
  primary_language: string;
}

function authHeaders(): Record<string, string> {
  const token = getStoredToken();
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const resp = await fetch(`${API_BASE_URL}/projects`, { headers: authHeaders() });
  if (!resp.ok) throw new Error(`Failed to fetch projects: ${resp.status}`);
  return resp.json();
}

export async function createProject(payload: ProjectCreate): Promise<Project> {
  const resp = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.detail?.error?.message || err?.error?.message || `Failed to create project: ${resp.status}`);
  }
  return resp.json();
}

export async function deleteProject(projectId: string): Promise<void> {
  const resp = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!resp.ok) throw new Error(`Failed to delete project: ${resp.status}`);
}
