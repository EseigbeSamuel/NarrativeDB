import { useState, useMemo } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  BookOpen01Icon,
  FolderOpenIcon,
  UserMultipleIcon,
  ChartHistogramIcon,
  CreditCardIcon,
  Settings01Icon,
  FlowIcon,
  Comment01Icon,
  TaskDone01Icon,
  Location01Icon,
  CodeCircleIcon,
  CubeIcon,
  Flag01Icon,
  Search01Icon,
  GitBranchIcon,
} from '@hugeicons/core-free-icons'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'

// Organization navigation menu items
const orgNavItems = [
  { title: 'Projects', url: '/org', icon: FolderOpenIcon, exact: true },
  { title: 'Team', url: '/org/teams', icon: UserMultipleIcon },
  { title: 'Analytics', url: '/org/analytics/Analytics', icon: ChartHistogramIcon },
  { title: 'Billing', url: '/org/billing', icon: CreditCardIcon },
  { title: 'Organization Settings', url: '/org/org-setting', icon: Settings01Icon },
]

// Project navigation menu items
const projectNavItems = [
  {
    title: 'Overview',
    url: '/org/project',
    icon: FolderOpenIcon,
    exact: true,
  },
  {
    title: 'Visual Flowchart',
    url: '/org/project/Editor',
    icon: FlowIcon,
  },
]

const assetItems = [
  {
    title: 'Characters',
    url: '/org/project/narrative-assets/Characters',
    icon: UserMultipleIcon,
    count: 124,
  },
  {
    title: 'Dialogue',
    url: '/org/project/narrative-assets/Dialogue',
    icon: Comment01Icon,
    count: 86,
  },
  {
    title: 'Quests',
    url: '/org/project/narrative-assets/Quest',
    icon: TaskDone01Icon,
    count: 32,
  },
  {
    title: 'Locations',
    url: '/org/project/narrative-assets/Locations',
    icon: Location01Icon,
    count: 18,
  },
  {
    title: 'Variables',
    url: '/org/project/narrative-assets/Variables',
    icon: CodeCircleIcon,
    count: 42,
  },
  {
    title: 'Items',
    url: '/org/project/narrative-assets/Items',
    icon: CubeIcon,
    count: 95,
  },
  {
    title: 'Factions',
    url: '/org/project/narrative-assets/Factions',
    icon: Flag01Icon,
    count: 6,
  },
  {
    title: 'Story Nodes',
    url: '/org/project/narrative-assets/StoryNodes',
    icon: FolderOpenIcon,
    count: 412,
  },
  {
    title: 'Conditions',
    url: '/org/project/narrative-assets/Conditions',
    icon: BookOpen01Icon,
    count: 28,
  },
]

const developerSysItems = [
  { title: 'SDK & API Docs', url: '/org/project/SDK', icon: CodeCircleIcon },
  {
    title: 'Project Settings',
    url: '/org/project/settings/Settings',
    icon: Settings01Icon,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const [filterQuery, setFilterQuery] = useState('')

  // Determine whether current route is within project context
  const isProjectMode = pathname.startsWith('/org/project')

  // Filter items in Project mode
  const filteredProjectNav = useMemo(() => {
    if (!filterQuery.trim()) return projectNavItems
    return projectNavItems.filter((item) =>
      item.title.toLowerCase().includes(filterQuery.toLowerCase())
    )
  }, [filterQuery])

  const filteredAssets = useMemo(() => {
    if (!filterQuery.trim()) return assetItems
    return assetItems.filter((item) =>
      item.title.toLowerCase().includes(filterQuery.toLowerCase())
    )
  }, [filterQuery])

  const filteredDevSys = useMemo(() => {
    if (!filterQuery.trim()) return developerSysItems
    return developerSysItems.filter((item) =>
      item.title.toLowerCase().includes(filterQuery.toLowerCase())
    )
  }, [filterQuery])

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-sidebar">
      {/* Dynamic Header */}
      <SidebarHeader className="border-b border-border/40 p-3">
        {isProjectMode ? (
          // Supabase Project Sidebar Header
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Link to="/org" className="flex items-center gap-2 overflow-hidden group">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <HugeiconsIcon icon={FolderOpenIcon} size={15} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold tracking-tight text-sidebar-foreground truncate group-hover:text-primary transition-colors">
                    Whispering Woods
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider truncate">
                    CanvasCreations Project
                  </span>
                </div>
              </Link>
              <span className="inline-flex items-center gap-1 rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground shrink-0">
                <HugeiconsIcon icon={GitBranchIcon} size={10} />
                main
              </span>
            </div>

            {/* Quick Filter Search Input */}
            <div className="relative">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/70"
              />
              <input
                type="text"
                placeholder="Filter assets & pages..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-2 bg-background/60 border border-border/50 rounded-lg text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
        ) : (
          // Supabase Organization Sidebar Header
          <div className="flex items-center justify-between p-1">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-black shadow-sm">
                <HugeiconsIcon icon={BookOpen01Icon} size={18} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold tracking-tight text-sidebar-foreground truncate">
                    CanvasCreations
                  </span>
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 text-[9px] font-semibold text-emerald-400 uppercase">
                    FREE
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Organization Dashboard
                </span>
              </div>
            </div>
          </div>
        )}
      </SidebarHeader>

      {/* Dynamic Content */}
      <SidebarContent className="px-2 py-3 space-y-4">
        {isProjectMode ? (
          // PROJECT MODE SIDEBAR CONTENT
          <>
            {/* Overview / Flowchart */}
            {filteredProjectNav.length > 0 && (
              <SidebarGroup className="p-0">
                <SidebarGroupLabel className="px-2 py-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
                  Project Overview
                </SidebarGroupLabel>
                <SidebarGroupContent className="mt-1">
                  <SidebarMenu>
                    {filteredProjectNav.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          render={
                            <Link
                              to={item.url}
                              activeOptions={{ exact: item.exact }}
                              activeProps={{
                                className:
                                  'bg-accent text-accent-foreground font-semibold border-l-2 border-primary pl-2.5',
                              }}
                            />
                          }
                        >
                          <HugeiconsIcon icon={item.icon} size={16} />
                          <span className="text-xs">{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {/* Narrative Assets */}
            {filteredAssets.length > 0 && (
              <SidebarGroup className="p-0">
                <SidebarGroupLabel className="px-2 py-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
                  Narrative Assets
                </SidebarGroupLabel>
                <SidebarGroupContent className="mt-1">
                  <SidebarMenu>
                    {filteredAssets.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          render={
                            <Link
                              to={item.url}
                              activeProps={{
                                className:
                                  'bg-accent text-accent-foreground font-semibold border-l-2 border-primary pl-2.5',
                              }}
                              className="flex items-center justify-between w-full"
                            />
                          }
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <HugeiconsIcon icon={item.icon} size={16} />
                            <span className="text-xs truncate">{item.title}</span>
                          </div>
                          {item.count !== undefined && (
                            <span className="ml-auto text-[10px] font-mono text-muted-foreground/70 bg-muted/50 px-1.5 py-0.5 rounded">
                              {item.count}
                            </span>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {/* Developer & Settings */}
            {filteredDevSys.length > 0 && (
              <SidebarGroup className="p-0">
                <SidebarGroupLabel className="px-2 py-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
                  Developer & Settings
                </SidebarGroupLabel>
                <SidebarGroupContent className="mt-1">
                  <SidebarMenu>
                    {filteredDevSys.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          render={
                            <Link
                              to={item.url}
                              activeProps={{
                                className:
                                  'bg-accent text-accent-foreground font-semibold border-l-2 border-primary pl-2.5',
                              }}
                            />
                          }
                        >
                          <HugeiconsIcon icon={item.icon} size={16} />
                          <span className="text-xs">{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </>
        ) : (
          // ORGANIZATION MODE SIDEBAR CONTENT
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="px-2 py-1 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
              Organization
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-1">
              <SidebarMenu>
                {orgNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      render={
                        <Link
                          to={item.url}
                          activeOptions={{ exact: item.exact }}
                          activeProps={{
                            className: 'bg-accent text-accent-foreground font-semibold border-l-2 border-primary pl-2.5',
                          }}
                        />
                      }
                    >
                      <HugeiconsIcon icon={item.icon} size={18} />
                      <span className="text-xs">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Dynamic Footer */}
      <SidebarFooter className="border-t border-border/40 p-3">
        <div className="flex items-center gap-3 px-1 py-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground border border-border">
            <HugeiconsIcon icon={UserMultipleIcon} size={16} />
          </div>
          <div className="flex flex-col gap-0.5 overflow-hidden">
            <span className="text-xs font-semibold truncate text-sidebar-foreground">
              CanvasCreations
            </span>
            <span className="text-[10px] text-muted-foreground truncate">
              {isProjectMode ? 'Project: Whispering Woods' : 'Free Organization'}
            </span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
