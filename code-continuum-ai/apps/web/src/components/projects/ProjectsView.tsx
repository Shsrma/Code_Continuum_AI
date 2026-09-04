import { useEffect, useState } from 'react';
import { fetchProjects, deleteProject, Project } from '../../services/projectApi';
import { CreateProjectModal } from '../projects/CreateProjectModal';
import {
  FolderPlus, Trash2, GitBranch, Clock, Code2, Loader2,
  AlertCircle, FolderOpen, ChevronRight
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/50',
  ARCHIVED: 'text-slate-400 bg-slate-800/50 border-slate-700/50',
  INACTIVE: 'text-amber-400 bg-amber-950/50 border-amber-800/50',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

interface ProjectsViewProps {
  isAuthenticated: boolean;
  onOpenProject?: (project: Project) => void;
}

export function ProjectsView({ isAuthenticated, onOpenProject }: ProjectsViewProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadProjects();
    else setLoading(false);
  }, [isAuthenticated]);

  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete project "${project.name}"? This cannot be undone.`)) return;
    setDeletingId(project.id);
    try {
      await deleteProject(project.id);
      setProjects(ps => ps.filter(p => p.id !== project.id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <FolderOpen className="h-12 w-12 text-slate-600" />
        <h3 className="text-lg font-semibold text-white">Sign in to view your projects</h3>
        <p className="text-sm text-slate-400 max-w-sm">You need to be authenticated to create and manage projects.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Projects</h2>
          <p className="text-sm text-slate-400 mt-0.5">Manage your code analysis projects</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold shadow-md shadow-cyan-500/20 transition-all"
        >
          <FolderPlus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-center space-x-3 text-rose-300 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-slate-400 space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
          <span className="text-sm">Loading projects...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center glass-card rounded-2xl border border-slate-800">
          <div className="h-16 w-16 rounded-2xl bg-slate-800 flex items-center justify-center">
            <FolderOpen className="h-8 w-8 text-slate-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">No projects yet</h3>
            <p className="text-sm text-slate-400 mt-1">Create your first project to get started with repository analysis.</p>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium transition-colors"
          >
            <FolderPlus className="h-4 w-4" />
            <span>Create Project</span>
          </button>
        </div>
      )}

      {/* Projects grid */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map(project => (
            <div
              key={project.id}
              className="glass-card rounded-xl border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition-all group"
            >
              {/* Project header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <GitBranch className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate">{project.name}</h3>
                    <p className="text-xs font-mono text-slate-500 truncate">{project.slug}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border flex-shrink-0 ml-2 ${STATUS_COLORS[project.status] || STATUS_COLORS['ACTIVE']}`}>
                  {project.status}
                </span>
              </div>

              {/* Description */}
              {project.description && (
                <p className="text-xs text-slate-400 line-clamp-2">{project.description}</p>
              )}

              {/* Meta */}
              <div className="flex items-center space-x-3 text-xs text-slate-500">
                <span className="flex items-center space-x-1">
                  <Code2 className="h-3.5 w-3.5" />
                  <span>{project.primary_language}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatDate(project.created_at)}</span>
                </span>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-slate-900/60 p-2.5 text-center">
                  <div className="text-base font-bold text-white">{project.health_score.toFixed(0)}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Health</div>
                </div>
                <div className="rounded-lg bg-slate-900/60 p-2.5 text-center">
                  <div className="text-base font-bold text-white">{project.continuity_score.toFixed(0)}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Continuity</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => onOpenProject?.(project)}
                  className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <span>Open Project</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(project)}
                  disabled={deletingId === project.id}
                  title="Delete Project"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-500 hover:text-rose-400 transition-colors disabled:opacity-50"
                >
                  {deletingId === project.id
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : <Trash2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={loadProjects}
      />
    </div>
  );
}
