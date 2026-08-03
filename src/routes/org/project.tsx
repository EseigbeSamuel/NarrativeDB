import { createFileRoute, Outlet, Link } from "@tanstack/react-router"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardCircleIcon,
  FlowIcon,
  UserMultipleIcon,
  Comment01Icon,
  TaskDone01Icon,
  Location01Icon,
  FolderOpenIcon,
  CodeCircleIcon,
  Settings01Icon,
  CubeIcon,
  Flag01Icon,
  BookOpen01Icon,
} from "@hugeicons/core-free-icons"

export const Route = createFileRoute("/org/project")({
  component: ProjectLayout,
})

const navItems = [
  {
    title: "Dashboard",
    url: "/org/project",
    icon: DashboardCircleIcon,
  },
  {
    title: "Visual Editor",
    url: "/org/project/Editor",
    icon: FlowIcon,
  },
]

const assetItems = [
  {
    title: "Characters",
    url: "/org/project/narrative-assets/Characters",
    icon: UserMultipleIcon,
  },
  {
    title: "Dialogue",
    url: "/org/project/narrative-assets/Dialogue",
    icon: Comment01Icon,
  },
  {
    title: "Quests",
    url: "/org/project/narrative-assets/Quest",
    icon: TaskDone01Icon,
  },
  {
    title: "Locations",
    url: "/org/project/narrative-assets/Locations",
    icon: Location01Icon,
  },
  {
    title: "Variables",
    url: "/org/project/narrative-assets/Variables",
    icon: CodeCircleIcon,
  },
  {
    title: "Items",
    url: "/org/project/narrative-assets/Items",
    icon: CubeIcon,
  },
  {
    title: "Factions",
    url: "/org/project/narrative-assets/Factions",
    icon: Flag01Icon,
  },
  {
    title: "Story Nodes",
    url: "/org/project/narrative-assets/StoryNodes",
    icon: FolderOpenIcon,
  },
  {
    title: "Conditions",
    url: "/org/project/narrative-assets/Conditions",
    icon: BookOpen01Icon,
  },
]

const sysItems = [
  { title: "SDK & API", url: "/org/project/SDK", icon: CodeCircleIcon },
  {
    title: "Settings",
    url: "/org/project/settings/Settings",
    icon: Settings01Icon,
  },
]

function ProjectLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <SidebarHeader className="border-b border-border/50 p-4">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <HugeiconsIcon icon={BookOpen01Icon} size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight">
                NarrativeDB
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="py-4">
            <SidebarGroup>
              <SidebarGroupLabel>Project</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        render={
                          <Link
                            to={item.url}
                            activeProps={{
                              className:
                                "bg-accent text-accent-foreground font-medium",
                            }}
                            activeOptions={{
                              exact: item.url === "/org/project",
                            }}
                          />
                        }
                      >
                        <HugeiconsIcon icon={item.icon} size={18} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Narrative Assets</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {assetItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        render={
                          <Link
                            to={item.url}
                            activeProps={{
                              className:
                                "bg-accent text-accent-foreground font-medium",
                            }}
                          />
                        }
                      >
                        <HugeiconsIcon icon={item.icon} size={18} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sysItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        render={
                          <Link
                            to={item.url}
                            activeProps={{
                              className:
                                "bg-accent text-accent-foreground font-medium",
                            }}
                          />
                        }
                      >
                        <HugeiconsIcon icon={item.icon} size={18} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex h-screen flex-1 flex-col overflow-hidden bg-background">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
