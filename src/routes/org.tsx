import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { Header } from '@/components/Header'

export const Route = createFileRoute('/org')({
  component: OrgLayout,
})

function OrgLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Supabase Dynamic App Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-col min-h-screen flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-background/50">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
