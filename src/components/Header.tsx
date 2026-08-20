import { Link, useLocation } from '@tanstack/react-router'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Search01Icon,
  BookOpen01Icon,
  FolderOpenIcon,
  GitBranchIcon,
  ArrowDown01Icon,
  HelpCircleIcon,
  Notification01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons'

// Friendly route titles mapping for child page breadcrumbs
const ROUTE_NAME_MAP: Record<string, string> = {
  Editor: 'Visual Editor',
  SDK: 'SDK & API Docs',
  settings: 'Settings',
  'narrative-assets': 'Narrative Assets',
  Characters: 'Characters',
  Dialogue: 'Dialogue',
  Quest: 'Quests',
  Locations: 'Locations',
  Variables: 'Variables',
  Items: 'Items',
  Factions: 'Factions',
  StoryNodes: 'Story Nodes',
  Conditions: 'Conditions',
  teams: 'Team',
  analytics: 'Analytics',
  Analytics: 'Analytics',
  billing: 'Billing',
  'org-setting': 'Settings',
}

export function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const isProjectMode = pathname.startsWith('/org/project')

  // Get current sub-page label if deep inside project or org
  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  const currentSubPageTitle =
    lastSegment && ROUTE_NAME_MAP[lastSegment] ? ROUTE_NAME_MAP[lastSegment] : null

  return (
    <header className="sticky top-0 z-30 flex h-13 w-full shrink-0 items-center justify-between border-b border-border/40 bg-background/95 px-3 py-2 backdrop-blur-md transition-all text-xs">
      {/* Left Section: Sidebar Toggle + Supabase Style Dynamic Breadcrumbs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <SidebarTrigger className="h-7 w-7 text-muted-foreground hover:text-foreground" />
        <Separator orientation="vertical" className="h-4 bg-border/60" />

        {/* Supabase Green Brand Logo */}
        <Link
          to="/org"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500 text-slate-950 font-black shadow-sm hover:scale-105 transition-transform"
        >
          <HugeiconsIcon icon={BookOpen01Icon} size={14} />
        </Link>

        <span className="text-muted-foreground/40 font-mono text-xs">/</span>

        {/* Supabase Org Selector Pill */}
        <Link
          to="/org"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-foreground font-medium hover:bg-accent/60 transition-colors"
        >
          <span className="font-semibold text-xs truncate">CanvasCreations</span>
          <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-1 py-0.2 text-[9px] font-semibold text-emerald-400 uppercase">
            FREE
          </span>
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={12}
            className="text-muted-foreground ml-0.5"
          />
        </Link>

        {/* Supabase Project Selector Pill (Shown when inside project) */}
        {isProjectMode && (
          <>
            <span className="text-muted-foreground/40 font-mono text-xs">/</span>
            <Link
              to="/org/project"
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-foreground font-medium hover:bg-accent/60 transition-colors"
            >
              <HugeiconsIcon icon={FolderOpenIcon} size={14} className="text-emerald-400" />
              <span className="font-semibold text-xs truncate">CanvasCreations's Project</span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={12}
                className="text-muted-foreground ml-0.5"
              />
            </Link>

            <span className="text-muted-foreground/40 font-mono text-xs">/</span>
            <div className="flex items-center gap-1.5 rounded-md bg-muted/40 border border-border/40 px-2 py-0.5 text-muted-foreground">
              <HugeiconsIcon icon={GitBranchIcon} size={11} className="text-primary" />
              <span className="font-mono text-[11px] font-medium">main</span>
              <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.2 text-[8px] font-semibold text-emerald-400 uppercase">
                PRODUCTION
              </span>
            </div>
          </>
        )}

        {/* Current Active Sub-Page Label */}
        {currentSubPageTitle &&
          currentSubPageTitle !== 'The Whispering Woods' &&
          currentSubPageTitle !== 'Organization' && (
            <>
              <span className="text-muted-foreground/40 font-mono text-xs">/</span>
              <span className="font-medium text-foreground text-xs truncate px-1 py-0.5 bg-accent/30 rounded">
                {currentSubPageTitle}
              </span>
            </>
          )}
      </div>

      {/* Right Section: Supabase Header Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Quick Search Command Bar */}
        <button
          onClick={() => {}}
          className="hidden md:flex h-7 w-60 items-center justify-between rounded-lg border border-border/50 bg-muted/40 px-2.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/70"
        >
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Search01Icon} size={13} />
            <span className="text-[11px]">Search...</span>
          </div>
          <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border border-border/60 bg-background px-1 font-mono text-[9px] font-medium text-muted-foreground">
            Ctrl K
          </kbd>
        </button>

        {/* Feedback Button */}
        <button className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border/50 bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:bg-accent transition-colors">
          Feedback
        </button>

        {/* Help & Docs Icon */}
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <HugeiconsIcon icon={HelpCircleIcon} size={15} />
        </button>

        {/* Notifications */}
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <HugeiconsIcon icon={Notification01Icon} size={15} />
        </button>

        {/* User Avatar */}
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold shadow-sm cursor-pointer hover:ring-2 hover:ring-emerald-500/40 transition-all">
          <HugeiconsIcon icon={UserIcon} size={14} />
        </div>
      </div>
    </header>
  )
}
