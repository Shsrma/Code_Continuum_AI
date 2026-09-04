import { useEffect, useState } from 'react';
import { fetchHealthStatus, HealthStatus } from './services/api';
import { useAuth } from './context/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { ProjectsView } from './components/projects/ProjectsView';
import { 
  Activity, 
  Database, 
  Layers, 
  ShieldCheck, 
  Terminal, 
  GitBranch, 
  FileCode, 
  HelpCircle, 
  CheckSquare, 
  FileText, 
  BarChart3, 
  RefreshCw,
  Server,
  LogIn,
  LogOut,
  Construction
} from 'lucide-react';

export function App() {
  const { user, isAuthenticated, logout } = useAuth();
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const checkHealth = async () => {
    setLoading(true);
    const res = await fetchHealthStatus();
    if (res.success && res.data) {
      setHealth(res.data);
    } else {
      setHealth({
        status: 'offline',
        service: 'Code Continuum AI API',
        version: '0.1.0',
        environment: 'development',
        database: 'disconnected'
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'projects', label: 'Projects', icon: GitBranch },
    { id: 'analysis', label: 'Code Analysis', icon: FileCode },
    { id: 'chat', label: 'AI Assistant', icon: HelpCircle },
    { id: 'tests', label: 'Test Generator', icon: CheckSquare },
    { id: 'documentation', label: 'Documentation', icon: FileText },
    { id: 'continuity', label: 'Continuity Report', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Terminal className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg tracking-tight text-white">CODE CONTINUUM AI</h1>
              <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                v0.1.0 MVP
              </span>
            </div>
            <p className="text-xs text-slate-400">Software Legacy & Engineering Continuity Platform</p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
            <span className={`h-2.5 w-2.5 rounded-full ${health?.status === 'healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-slate-300 font-medium">Backend:</span>
            <span className={`font-semibold ${health?.status === 'healthy' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {health?.status === 'healthy' ? 'Online (HTTP 200)' : 'Offline / Waiting'}
            </span>
          </div>

          <button
            onClick={checkHealth}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-xs font-medium text-slate-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Ping Backend</span>
          </button>

          {/* User Auth Section */}
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
              <div className="flex items-center space-x-2 text-xs">
                <div className="h-7 w-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                  {user.display_name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <p className="font-semibold text-slate-200 leading-none">{user.display_name}</p>
                  <p className="text-[10px] font-mono text-slate-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-slate-800/60 bg-slate-950/60 p-4 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">

          {/* ── DASHBOARD TAB ── */}
          {activeTab === 'dashboard' && (
            <>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 border border-slate-800 shadow-xl">
                <div className="relative z-10 space-y-2">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {isAuthenticated ? `Welcome back, ${user?.display_name}` : 'Code Continuum AI'}
                  </h2>
                  <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">
                    {isAuthenticated
                      ? `Authenticated as ${user?.email}. Create a project and import a repository to get started.`
                      : 'An AI-powered software engineering continuity platform. Sign in to create projects and analyze repositories.'}
                  </p>
                </div>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
                  <Terminal className="h-48 w-48 text-cyan-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">System Status</span>
                    <Activity className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white capitalize">{health?.status || 'Unknown'}</div>
                  <p className="text-xs text-slate-400 font-mono">{health?.service || 'Code Continuum AI API'}</p>
                </div>

                <div className="glass-card rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Authentication</span>
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{isAuthenticated ? 'Active JWT' : 'Guest'}</div>
                  <p className="text-xs text-slate-400 font-mono">{isAuthenticated ? user?.email : 'Sign in to access projects'}</p>
                </div>

                <div className="glass-card rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">API Version</span>
                    <Server className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{health?.version || 'v0.1.0'}</div>
                  <p className="text-xs text-slate-400">Env: <span className="font-mono text-slate-300">{health?.environment || 'dev'}</span></p>
                </div>

                <div className="glass-card rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Database</span>
                    <Database className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white capitalize">{health?.database || 'Connected'}</div>
                  <p className="text-xs text-slate-400">SQLite (dev) / PostgreSQL (prod)</p>
                </div>
              </div>
            </>
          )}

          {/* ── PROJECTS TAB ── */}
          {activeTab === 'projects' && (
            <ProjectsView isAuthenticated={isAuthenticated} />
          )}

          {/* ── UNIMPLEMENTED TABS ── */}
          {['analysis', 'chat', 'tests', 'documentation', 'continuity'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
              <div className="h-16 w-16 rounded-2xl bg-slate-800 flex items-center justify-center">
                <Construction className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {activeTab === 'analysis' && 'Repository Analysis'}
                  {activeTab === 'chat' && 'AI Code Assistant'}
                  {activeTab === 'tests' && 'Test Scenario Generator'}
                  {activeTab === 'documentation' && 'Documentation Generator'}
                  {activeTab === 'continuity' && 'Continuity Report'}
                </h3>
                <p className="text-sm text-amber-400/80 mt-2 font-mono">Coming in next phase — not yet implemented</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  This feature will be available after Repository Import (Phase E) is complete.
                  Create a project first using the Projects tab.
                </p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default App;
