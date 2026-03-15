import { useState } from 'react';
import { PrototypeShell, PhoneFrame, WindowFrame, useTheme } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Home,
  Settings,
  User,
  Plus,
  Check,
  MoreVertical,
  Moon,
  Sun,
  Bell,
  Search,
  Clock,
  FolderKanban,
  Calendar,
  MessageSquare,
  Users,
  BarChart3,
  Filter,
  SortAsc,
  Star,
  Heart,
  Share2,
  Trash2,
  Edit,
  Archive,
  Flag,
  CalendarDays,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Link2,
  Github,
  Twitter,
  Linkedin,
  Briefcase,
  GraduationCap,
  Language,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Send,
  Paperclip,
  Smile,
  Image,
  ThumbsUp,
  MessageCircle,
  Repost,
  Share,
  MoreHorizontal,
  ListFilter,
  Grid3X3,
  LayoutList,
  RefreshCw,
  Download,
  Upload,
  FileText,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Zap,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Lightbulb
} from 'lucide-react';

// ============== Mock Data ==============
const mockTasks = [
  { id: 1, title: 'Complete design review for mobile app', completed: false, priority: 'high', due: 'Today', project: 'Mobile App', assignee: { name: 'John Doe', avatar: 'JD' } },
  { id: 2, title: 'Update project documentation', completed: true, priority: 'medium', due: 'Yesterday', project: 'Website Redesign', assignee: { name: 'Alice Smith', avatar: 'AS' } },
  { id: 3, title: 'Review pull requests', completed: false, priority: 'high', due: 'Tomorrow', project: 'API Integration', assignee: { name: 'Mike Johnson', avatar: 'MJ' } },
  { id: 4, title: 'Prepare demo presentation', completed: false, priority: 'low', due: 'Dec 20', project: 'Mobile App', assignee: { name: 'John Doe', avatar: 'JD' } },
  { id: 5, title: 'Team meeting notes', completed: false, priority: 'medium', due: 'Today', project: 'Website Redesign', assignee: { name: 'Sarah Lee', avatar: 'SL' } },
  { id: 6, title: 'Fix login bug on mobile', completed: false, priority: 'high', due: 'Today', project: 'Mobile App', assignee: { name: 'Mike Johnson', avatar: 'MJ' } },
  { id: 7, title: 'Update user profile page', completed: false, priority: 'medium', due: 'Tomorrow', project: 'Website Redesign', assignee: { name: 'Alice Smith', avatar: 'AS' } },
  { id: 8, title: 'Refactor API endpoints', completed: true, priority: 'low', due: 'Yesterday', project: 'API Integration', assignee: { name: 'John Doe', avatar: 'JD' } },
  { id: 9, title: 'Write unit tests for auth', completed: false, priority: 'medium', due: 'Dec 18', project: 'API Integration', assignee: { name: 'Mike Johnson', avatar: 'MJ' } },
  { id: 10, title: 'Design new dashboard widgets', completed: false, priority: 'high', due: 'Dec 22', project: 'Website Redesign', assignee: { name: 'Sarah Lee', avatar: 'SL' } },
  { id: 11, title: 'Optimize database queries', completed: false, priority: 'medium', due: 'Dec 19', project: 'API Integration', assignee: { name: 'John Doe', avatar: 'JD' } },
  { id: 12, title: 'Deploy to staging environment', completed: false, priority: 'high', due: 'Today', project: 'Mobile App', assignee: { name: 'Mike Johnson', avatar: 'MJ' } },
  { id: 13, title: 'Review competitor analysis', completed: false, priority: 'low', due: 'Dec 25', project: 'Website Redesign', assignee: { name: 'Alice Smith', avatar: 'AS' } },
  { id: 14, title: 'Create onboarding flow', completed: true, priority: 'medium', due: 'Yesterday', project: 'Mobile App', assignee: { name: 'Sarah Lee', avatar: 'SL' } },
  { id: 15, title: 'Implement dark mode toggle', completed: false, priority: 'medium', due: 'Dec 17', project: 'Mobile App', assignee: { name: 'John Doe', avatar: 'JD' } },
  { id: 16, title: 'Fix navigation edge cases', completed: false, priority: 'high', due: 'Today', project: 'Mobile App', assignee: { name: 'Mike Johnson', avatar: 'MJ' } },
  { id: 17, title: 'Add analytics tracking', completed: false, priority: 'low', due: 'Dec 21', project: 'Website Redesign', assignee: { name: 'Alice Smith', avatar: 'AS' } },
  { id: 18, title: 'Update privacy policy', completed: false, priority: 'medium', due: 'Dec 23', project: 'Website Redesign', assignee: { name: 'John Doe', avatar: 'JD' } },
  { id: 19, title: 'Design email templates', completed: false, priority: 'low', due: 'Dec 24', project: 'Website Redesign', assignee: { name: 'Sarah Lee', avatar: 'SL' } },
  { id: 20, title: 'Code review for PR #142', completed: false, priority: 'high', due: 'Today', project: 'API Integration', assignee: { name: 'Mike Johnson', avatar: 'MJ' } },
];

const mockProjects = [
  { id: 1, name: 'Mobile App', tasks: 12, completed: 8, color: 'bg-blue-500', progress: 67, members: [{ name: 'John Doe', avatar: 'JD' }, { name: 'Alice Smith', avatar: 'AS' }, { name: 'Mike Johnson', avatar: 'MJ' }] },
  { id: 2, name: 'Website Redesign', tasks: 8, completed: 5, color: 'bg-purple-500', progress: 62, members: [{ name: 'Sarah Lee', avatar: 'SL' }, { name: 'John Doe', avatar: 'JD' }] },
  { id: 3, name: 'API Integration', tasks: 5, completed: 2, color: 'bg-green-500', progress: 40, members: [{ name: 'Mike Johnson', avatar: 'MJ' }, { name: 'Alice Smith', avatar: 'AS' }, { name: 'John Doe', avatar: 'JD' }] },
  { id: 4, name: 'Marketing Campaign', tasks: 6, completed: 6, color: 'bg-orange-500', progress: 100, members: [{ name: 'Sarah Lee', avatar: 'SL' }] },
  { id: 5, name: 'Security Audit', tasks: 4, completed: 1, color: 'bg-red-500', progress: 25, members: [{ name: 'Mike Johnson', avatar: 'MJ' }, { name: 'John Doe', avatar: 'JD' }] },
];

const mockTeamMembers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Product Manager', avatar: 'JD', status: 'online', tasks: 8 },
  { id: 2, name: 'Alice Smith', email: 'alice@example.com', role: 'UX Designer', avatar: 'AS', status: 'away', tasks: 5 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Backend Developer', avatar: 'MJ', status: 'online', tasks: 6 },
  { id: 4, name: 'Sarah Lee', email: 'sarah@example.com', role: 'Frontend Developer', avatar: 'SL', status: 'offline', tasks: 4 },
  { id: 5, name: 'Tom Wilson', email: 'tom@example.com', role: 'QA Engineer', avatar: 'TW', status: 'online', tasks: 3 },
];

const mockMessages = [
  { id: 1, from: { name: 'Alice Smith', avatar: 'AS' }, message: 'Hey, can you review the latest design mockups?', time: '10:30 AM', unread: true },
  { id: 2, from: { name: 'Mike Johnson', avatar: 'MJ' }, message: 'The API is ready for testing!', time: '9:45 AM', unread: true },
  { id: 3, from: { name: 'Sarah Lee', avatar: 'SL' }, message: 'Thanks for the feedback on the dashboard', time: 'Yesterday', unread: false },
  { id: 4, from: { name: 'Tom Wilson', avatar: 'TW' }, message: 'Found a bug in the login flow...', time: 'Yesterday', unread: false },
];

const mockActivity = [
  { id: 1, user: 'John Doe', action: 'completed', target: 'Update documentation', time: '2 hours ago', icon: CheckCircle2 },
  { id: 2, user: 'Alice Smith', action: 'commented on', target: 'Design review', time: '3 hours ago', icon: MessageCircle },
  { id: 3, user: 'Mike Johnson', action: 'created', target: 'New task: Fix login bug', time: '5 hours ago', icon: Plus },
  { id: 4, user: 'Sarah Lee', action: 'uploaded', target: 'dashboard-mockup.png', time: 'Yesterday', icon: Upload },
  { id: 5, user: 'Tom Wilson', action: 'completed', target: 'Test cases for API', time: 'Yesterday', icon: CheckCircle2 },
];

// ============== Utility Components ==============
function PriorityBadge({ priority }: { priority: string }) {
  const variants = {
    high: 'destructive',
    medium: 'default',
    low: 'secondary'
  } as const;
  return <Badge variant={variants[priority as keyof typeof variants] || 'secondary'} className="text-xs">{priority}</Badge>;
}

function StatusIndicator({ status }: { status: string }) {
  const colors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-400'
  };
  return <span className={`w-2 h-2 rounded-full ${colors[status as keyof typeof colors] || 'bg-gray-400'} border-2 border-white dark:border-neutral-800`} />;
}

// ============== Mobile Components ==============
function MobileTabBar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const theme = useTheme();
  return (
    <div className={`h-16 flex items-center justify-around border-t ${theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
      <TabButton icon={Home} label="Home" active={activeTab === 'home'} onClick={() => onTabChange('home')} badge={3} />
      <TabButton icon={FolderKanban} label="Projects" active={activeTab === 'projects'} onClick={() => onTabChange('projects')} />
      <TabButton icon={CalendarDays} label="Calendar" active={activeTab === 'calendar'} onClick={() => onTabChange('calendar')} />
      <TabButton icon={MessageSquare} label="Messages" active={activeTab === 'messages'} onClick={() => onTabChange('messages')} badge={2} />
      <TabButton icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => onTabChange('profile')} />
    </div>
  );
}

function TabButton({ icon: Icon, label, active, onClick, badge }: { icon: any; label: string; active: boolean; onClick: () => void; badge?: number }) {
  const theme = useTheme();
  return (
    <button onClick={onClick} className="relative flex flex-col items-center gap-1">
      <div className="relative">
        <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
        {badge && badge > 0 && (
          <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{badge}</span>
        )}
      </div>
      <span className={`text-xs ${active ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
    </button>
  );
}

// ============== Desktop Sidebar ==============
function DesktopSidebar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const theme = useTheme();
  const navItems = [
    { id: 'home', icon: Home, label: 'Dashboard', badge: 3 },
    { id: 'projects', icon: FolderKanban, label: 'Projects' },
    { id: 'calendar', icon: CalendarDays, label: 'Calendar' },
    { id: 'messages', icon: MessageSquare, label: 'Messages', badge: 2 },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];
  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`w-60 h-full ${theme === 'dark' ? 'bg-neutral-800 border-r border-neutral-700' : 'bg-white border-r border-neutral-200'} flex flex-col`}>
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Check className="w-5 h-5 text-primary" />
          TaskFlow
        </h1>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          <p className={`text-xs font-medium px-3 py-2 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>MAIN</p>
          {navItems.map((item) => (
            <SidebarButton key={item.id} item={item} active={activeTab === item.id} onClick={() => onTabChange(item.id)} theme={theme} />
          ))}
          <p className={`text-xs font-medium px-3 py-2 mt-4 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>SYSTEM</p>
          {bottomItems.map((item) => (
            <SidebarButton key={item.id} item={item} active={activeTab === item.id} onClick={() => onTabChange(item.id)} theme={theme} />
          ))}
        </div>
      </ScrollArea>
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`}>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><User className="w-4 h-4 mr-2" /> Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="w-4 h-4 mr-2" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500"><LogOut className="w-4 h-4 mr-2" /> Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

function SidebarButton({ item, active, onClick, theme }: { item: any; active: boolean; onClick: () => void; theme: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 ${
        active
          ? 'bg-primary text-primary-foreground'
          : theme === 'dark'
          ? 'text-neutral-400 hover:bg-neutral-700'
          : 'text-neutral-600 hover:bg-neutral-100'
      }`}
    >
      <item.icon className="w-5 h-5" />
      <span className="flex-1 text-left">{item.label}</span>
      {item.badge && (
        <Badge variant="destructive" className="h-5 min-w-5 px-1.5">{item.badge}</Badge>
      )}
    </button>
  );
}

// ============== Page Components ==============

// Home Page - Mobile
function MobileHomePage({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const theme = useTheme();
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState('all');

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  const todayTasks = tasks.filter(t => t.due === 'Today' && !t.completed);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Good morning!</h1>
          <p className="text-sm text-muted-foreground">{todayTasks.length} tasks due today</p>
        </div>
        <Button size="icon" variant="ghost" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
      </div>

      <div className={`flex items-center gap-2 p-3 mb-4 rounded-lg ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks..."
          className={`flex-1 bg-transparent outline-none text-sm ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}
        />
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterChip>
        <FilterChip active={filter === 'pending'} onClick={() => setFilter('pending')}>To Do</FilterChip>
        <FilterChip active={filter === 'completed'} onClick={() => setFilter('completed')}>Done</FilterChip>
      </div>

      <div className="space-y-2 mb-4">
        {filteredTasks.slice(0, 8).map((task) => (
          <Card key={task.id} className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''} hover:shadow-md transition-shadow cursor-pointer`} onClick={() => toggleTask(task.id)}>
            <CardContent className="p-3 flex items-start gap-3">
              <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} onClick={(e) => e.stopPropagation()} className="mt-0.5" />
              <div className="flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
                <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">{task.project}</Badge>
                  <PriorityBadge priority={task.priority} />
                </div>
              </div>
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-[10px]">{task.assignee.avatar}</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full" variant="outline" onClick={() => onNavigate('projects')}>
        View All Projects <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}

function FilterChip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-neutral-100 dark:bg-neutral-800 text-muted-foreground'
      }`}
    >
      {children}
    </button>
  );
}

// Home Page - Desktop
function DesktopHomePage({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const theme = useTheme();
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const stats = [
    { label: 'Total Tasks', value: '24', change: '+3', trend: 'up', icon: FolderKanban },
    { label: 'Completed', value: '18', change: '75%', trend: 'up', icon: CheckCircle2 },
    { label: 'Due Today', value: '5', change: '2 high', trend: 'down', icon: AlertCircle },
    { label: 'Team Members', value: '5', change: 'Online', trend: 'neutral', icon: Users },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, John!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="mobile">Mobile App</SelectItem>
                <SelectItem value="website">Website Redesign</SelectItem>
                <SelectItem value="api">API Integration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <Card key={i} className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {stat.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                {stat.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Tasks</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('projects')}>View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.slice(0, 8).map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.project}</p>
                    </div>
                    <PriorityBadge priority={task.priority} />
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-[10px]">{task.assignee.avatar}</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
            <CardHeader>
              <CardTitle className="text-base">Project Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{project.name}</span>
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockActivity.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                    <activity.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs"><span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span></p>
                    <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Projects Page - Mobile
function MobileProjectsPage() {
  const theme = useTheme();
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button size="icon" variant="ghost">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-3">
        {mockProjects.map((project) => (
          <Card key={project.id} className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center`}>
                  <FolderKanban className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{project.name}</p>
                  <p className="text-sm text-muted-foreground">{project.tasks} tasks</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem><Archive className="w-4 h-4 mr-2" /> Archive</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1.5" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex -space-x-2">
                  {project.members.map((member, i) => (
                    <Avatar key={i} className="w-6 h-6 border-2 border-white dark:border-neutral-800">
                      <AvatarFallback className="text-[10px]">{member.avatar}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="text-xs">View Tasks</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Projects Page - Desktop
function DesktopProjectsPage() {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">{mockProjects.length} projects</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg">
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8 rounded-r-none" onClick={() => setViewMode('grid')}>
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8 rounded-l-none" onClick={() => setViewMode('list')}>
              <LayoutList className="w-4 h-4" />
            </Button>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-4">
          {mockProjects.map((project) => (
            <Card key={project.id} className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''} hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center`}>
                      <FolderKanban className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{project.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{project.tasks} tasks</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem><Archive className="w-4 h-4 mr-2" /> Archive</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.members.map((member, i) => (
                        <TooltipProvider key={i}>
                          <Tooltip>
                            <TooltipTrigger>
                              <Avatar className="w-7 h-7 border-2 border-white dark:border-neutral-800">
                                <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{member.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                    <Badge variant="outline">{project.completed}/{project.tasks} done</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {mockProjects.map((project) => (
                <div key={project.id} className="flex items-center gap-4 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg ${project.color} flex items-center justify-center`}>
                    <FolderKanban className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.tasks} tasks</p>
                  </div>
                  <div className="w-48">
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground w-16">{project.progress}%</span>
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member, i) => (
                      <Avatar key={i} className="w-6 h-6 border-2 border-white dark:border-neutral-800">
                        <AvatarFallback className="text-[10px]">{member.avatar}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Calendar Page - Mobile
function MobileCalendarPage() {
  const theme = useTheme();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 14 + i);
    return { day: days[date.getDay()], date: date.getDate(), isToday: date.toDateString() === new Date().toDateString() };
  });

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Button size="icon" variant="ghost">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''} mb-4`}>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {days.map((day) => (
              <span key={day} className="text-xs font-medium text-muted-foreground">{day}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {dates.map((d, i) => (
              <button
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  d.isToday
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                {d.date}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <h2 className="font-semibold mb-3">Today's Schedule</h2>
      <div className="space-y-2">
        {mockTasks.filter(t => t.due === 'Today').slice(0, 4).map((task) => (
          <Card key={task.id} className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className={`w-1 h-10 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-blue-500' : 'bg-gray-400'}`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{task.title}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 9:00 AM - 10:00 AM
                </p>
              </div>
              <Badge variant="outline" className="text-xs">{task.project}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Calendar Page - Desktop
function DesktopCalendarPage() {
  const theme = useTheme();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <Select defaultValue="2024">
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <ChevronDown className="w-4 h-4 mr-2" /> Today
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className={`p-3 text-center font-medium text-sm ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>{day}</div>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - 14 + i);
          const isToday = date.toDateString() === new Date().toDateString();
          const hasEvents = i % 3 === 0;
          return (
            <div key={i} className={`min-h-24 p-2 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
              <span className={`text-sm ${isToday ? 'bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>{date.getDate()}</span>
              {hasEvents && (
                <div className="mt-1 space-y-1">
                  <div className="text-[10px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 rounded truncate">Design review</div>
                  <div className="text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-900 rounded truncate">Team meeting</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Messages Page - Mobile
function MobileMessagesPage() {
  const theme = useTheme();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  if (selectedChat) {
    return (
      <div className="flex flex-col h-full">
        <div className={`p-3 flex items-center gap-3 border-b ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`}>
          <Button variant="ghost" size="icon" onClick={() => setSelectedChat(null)}>
            <ChevronRight className="w-5 h-5 rotate-180" />
          </Button>
          <Avatar>
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">Alice Smith</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
          <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8"><AvatarFallback>AS</AvatarFallback></Avatar>
              <div className={`p-3 rounded-lg max-w-[80%] ${theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                <p className="text-sm">Hey, can you review the latest design mockups?</p>
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="p-3 rounded-lg max-w-[80%] bg-primary text-primary-foreground">
                <p className="text-sm">Sure! I'll take a look this afternoon.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Avatar className="w-8 h-8"><AvatarFallback>AS</AvatarFallback></Avatar>
              <div className={`p-3 rounded-lg max-w-[80%] ${theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                <p className="text-sm">Great! Let me know your thoughts.</p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className={`p-3 border-t flex items-center gap-2 ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`}>
          <Button variant="ghost" size="icon"><Paperclip className="w-5 h-5" /></Button>
          <Input placeholder="Type a message..." className="flex-1" />
          <Button variant="ghost" size="icon"><Smile className="w-5 h-5" /></Button>
          <Button size="icon"><Send className="w-5 h-5" /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className={`flex items-center gap-2 p-3 mb-4 rounded-lg ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
        <Search className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Search messages...</span>
      </div>
      <div className="space-y-2">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => setSelectedChat(msg.id)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}
          >
            <div className="relative">
              <Avatar>
                <AvatarFallback>{msg.from.avatar}</AvatarFallback>
              </Avatar>
              {msg.unread && <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-neutral-800" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{msg.from.name}</p>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Messages Page - Desktop
function DesktopMessagesPage() {
  const theme = useTheme();
  const [selectedChat, setSelectedChat] = useState(1);

  return (
    <div className="flex h-full">
      <div className={`w-80 border-r ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'} flex flex-col`}>
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h1 className="text-xl font-bold mb-3">Messages</h1>
          <div className={`flex items-center gap-2 p-2 rounded-lg ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages..."
              className={`flex-1 bg-transparent outline-none text-sm ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedChat(msg.id)}
                className={`flex items-center gap-3 p-4 cursor-pointer ${selectedChat === msg.id ? (theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100') : ''}`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{msg.from.avatar}</AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{msg.from.name}</p>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`}>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Alice Smith</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon"><Video className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8"><AvatarFallback>AS</AvatarFallback></Avatar>
              <div className={`p-3 rounded-lg max-w-[60%] ${theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                <p className="text-sm">Hey, can you review the latest design mockups?</p>
                <p className="text-[10px] text-muted-foreground mt-1">10:30 AM</p>
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <Avatar className="w-8 h-8"><AvatarFallback>JD</AvatarFallback></Avatar>
              <div className="p-3 rounded-lg max-w-[60%] bg-primary text-primary-foreground">
                <p className="text-sm">Sure! I'll take a look this afternoon.</p>
                <p className="text-[10px] text-primary-foreground/70 mt-1">10:32 AM</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Avatar className="w-8 h-8"><AvatarFallback>AS</AvatarFallback></Avatar>
              <div className={`p-3 rounded-lg max-w-[60%] ${theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                <p className="text-sm">Great! Let me know your thoughts.</p>
                <p className="text-[10px] text-muted-foreground mt-1">10:33 AM</p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className={`p-4 border-t flex items-center gap-2 ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`}>
          <Button variant="ghost" size="icon"><Paperclip className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon"><Image className="w-5 h-5" /></Button>
          <Input placeholder="Type a message..." className="flex-1" />
          <Button variant="ghost" size="icon"><Smile className="w-5 h-5" /></Button>
          <Button><Send className="w-5 h-5" /></Button>
        </div>
      </div>
    </div>
  );
}

function Video({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
}

// Team Page - Desktop
function DesktopTeamPage() {
  const theme = useTheme();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-sm text-muted-foreground">{mockTeamMembers.length} members</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" /> Invite
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {mockTeamMembers.map((member) => (
          <Card key={member.id} className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="text-lg">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-neutral-800 ${member.status === 'online' ? 'bg-green-500' : member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{member.tasks} tasks</Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Mail className="w-4 h-4 mr-2" /> Email</DropdownMenuItem>
                    <DropdownMenuItem><User className="w-4 h-4 mr-2" /> View Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500"><Trash2 className="w-4 h-4 mr-2" /> Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Analytics Page - Desktop
function DesktopAnalyticsPage() {
  const theme = useTheme();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Track your team's performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30d">
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Tasks Completed', value: '156', change: '+12%', icon: CheckCircle2, color: 'text-green-500' },
          { label: 'Active Projects', value: '8', change: '+2', icon: FolderKanban, color: 'text-blue-500' },
          { label: 'Team Velocity', value: '24', change: '+5', icon: Zap, color: 'text-purple-500' },
          { label: 'On-time Rate', value: '94%', change: '+2%', icon: Target, color: 'text-orange-500' },
        ].map((stat, i) => (
          <Card key={i} className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} /> {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500 mt-1">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
          <CardHeader>
            <CardTitle>Task Completion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-2">
              {[65, 45, 78, 52, 88, 72, 95, 68, 82, 76, 90, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t hover:bg-primary/40 transition-colors cursor-pointer" style={{ height: `${h}%` }}>
                  <div className="w-full bg-primary rounded-t" style={{ height: '100%' }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTeamMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{member.name}</span>
                    <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 30 + 70)}%</span>
                  </div>
                  <Progress value={Math.floor(Math.random() * 30 + 70)} className="h-2 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Profile Page - Mobile
function MobileProfilePage() {
  const theme = useTheme();
  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <Avatar className="w-20 h-20 mx-auto mb-3">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="text-2xl">JD</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold">John Doe</h1>
        <p className="text-sm text-muted-foreground">Product Manager</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-xl font-bold">24</p>
            <p className="text-xs text-muted-foreground">Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">5</p>
            <p className="text-xs text-muted-foreground">Team</p>
          </div>
        </div>
      </div>

      <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''} mb-4`}>
        <CardContent className="p-2">
          <Button variant="ghost" className="w-full justify-start"><User className="w-5 h-5 mr-3" /> Edit Profile</Button>
          <Button variant="ghost" className="w-full justify-start"><Bell className="w-5 h-5 mr-3" /> Notifications</Button>
          <Button variant="ghost" className="w-full justify-start"><Shield className="w-5 h-5 mr-3" /> Privacy</Button>
          <Button variant="ghost" className="w-full justify-start"><HelpCircle className="w-5 h-5 mr-3" /> Help & Support</Button>
        </CardContent>
      </Card>

      <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
        <CardContent className="p-2">
          <Button variant="ghost" className="w-full justify-start text-red-500"><LogOut className="w-5 h-5 mr-3" /> Sign Out</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Page
function SettingsPage({ isMobile }: { isMobile: boolean }) {
  const theme = useTheme();
  return (
    <div className={isMobile ? "p-4" : "p-6"}>
      <h1 className={`text-2xl font-bold mb-6 ${isMobile ? '' : ''}`}>Settings</h1>

      <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''} mb-4`}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><User className="w-5 h-5" /> Profile</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input defaultValue="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input defaultValue="john@example.com" type="email" />
          </div>
          <div className="grid gap-2">
            <Label>Bio</Label>
            <Textarea defaultValue="Product Manager at TaskFlow" />
          </div>
        </CardContent>
      </Card>

      <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''} mb-4`}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Moon className="w-5 h-5" /> Appearance</CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Dark Mode</Label>
            <Switch defaultChecked={theme === 'dark'} />
          </div>
          <div className="flex items-center justify-between">
            <Label>Reduce Motion</Label>
            <Switch />
          </div>
          <div className="grid gap-2">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''} mb-4`}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Push Notifications</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Email Notifications</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Task Reminders</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className={`${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : ''}`}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Shield className="w-5 h-5" /> Security</CardTitle>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start"><Key className="w-5 h-5 mr-3" /> Change Password</Button>
          <Button variant="outline" className="w-full justify-start"><Shield className="w-5 h-5 mr-3" /> Two-Factor Auth</Button>
          <Button variant="destructive" className="w-full">Sign Out</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Key({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
}

// ============== Main App ==============
function App() {
  const [currentPage, setCurrentPage] = useState('mobile');
  const [mobileTab, setMobileTab] = useState('home');
  const [desktopTab, setDesktopTab] = useState('home');

  const pages = [
    { id: 'mobile', name: 'Mobile View' },
    { id: 'desktop', name: 'Desktop View' },
  ];

  const renderMobileContent = () => {
    switch (mobileTab) {
      case 'home':
        return <MobileHomePage onNavigate={setMobileTab} />;
      case 'projects':
        return <MobileProjectsPage />;
      case 'calendar':
        return <MobileCalendarPage />;
      case 'messages':
        return <MobileMessagesPage />;
      case 'profile':
        return <MobileProfilePage />;
      default:
        return <MobileHomePage onNavigate={setMobileTab} />;
    }
  };

  const renderDesktopContent = () => {
    switch (desktopTab) {
      case 'home':
        return <DesktopHomePage onNavigate={setDesktopTab} />;
      case 'projects':
        return <DesktopProjectsPage />;
      case 'calendar':
        return <DesktopCalendarPage />;
      case 'messages':
        return <DesktopMessagesPage />;
      case 'team':
        return <DesktopTeamPage />;
      case 'analytics':
        return <DesktopAnalyticsPage />;
      case 'settings':
        return <SettingsPage isMobile={false} />;
      default:
        return <DesktopHomePage onNavigate={setDesktopTab} />;
    }
  };

  return (
    <PrototypeShell
      productName="TaskFlow Demo"
      pages={pages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      interactions={[
        'Click page dots to switch between Mobile/Desktop views',
        'Click theme toggle to switch Light/Dark mode',
        'Mobile: Tap bottom tab bar to navigate (Home/Projects/Calendar/Messages/Profile)',
        'Desktop: Use sidebar to navigate (Dashboard/Projects/Calendar/Messages/Team/Analytics/Settings)',
        'Toggle tasks by clicking checkboxes',
        'View projects in grid or list mode',
        'Click messages to open chat',
        'Use filters and dropdowns for options',
      ]}
      displayMode={currentPage === 'mobile' ? 'mobile' : 'desktop'}
    >
      {currentPage === 'mobile' ? (
        <PhoneFrame
          tabBar={<MobileTabBar activeTab={mobileTab} onTabChange={setMobileTab} />}
        >
          {renderMobileContent()}
        </PhoneFrame>
      ) : (
        <WindowFrame
          title="TaskFlow - Dashboard"
          sidebar={<DesktopSidebar activeTab={desktopTab} onTabChange={setDesktopTab} />}
        >
          {renderDesktopContent()}
        </WindowFrame>
      )}
    </PrototypeShell>
  );
}

export default App;
