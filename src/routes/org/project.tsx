import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/org/project')({
  component: ProjectLayout,
})

function ProjectLayout() {
  return (
    <div className="flex-1 w-full h-full bg-background/50">
      <Outlet />
    </div>
  )
}
