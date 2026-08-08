import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  BookOpen01Icon,
  FolderOpenIcon,
  UserMultipleIcon,
  ChartHistogramIcon,
  CreditCardIcon,
  Settings01Icon,
} from '@hugeicons/core-free-icons'

export const Route = createFileRoute('/org')({
  component: OrgLayout,
})

const topNavItems = [
  { title: 'Projects', url: '/org', icon: FolderOpenIcon, exact: true },
  { title: 'Team', url: '/org/teams', icon: UserMultipleIcon },
  { title: 'Analytics', url: '/org/analytics/Analytics', icon: ChartHistogramIcon },
  { title: 'Billing', url: '/org/billing', icon: CreditCardIcon },
  { title: 'Settings', url: '/org/org-setting', icon: Settings01Icon },
]

function OrgLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 mr-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HugeiconsIcon icon={BookOpen01Icon} size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight">NarrativeDB</span>
            <span className="ml-2 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              Organization
            </span>
          </div>
          
          <nav className="flex items-center space-x-1 lg:space-x-2">
            {topNavItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                activeOptions={{ exact: item.exact }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{
                  className: "bg-accent text-accent-foreground",
                }}
              >
                <HugeiconsIcon icon={item.icon} size={16} />
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="ml-auto flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-secondary border border-border flex items-center justify-center">
              <HugeiconsIcon icon={UserMultipleIcon} size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  )
}
