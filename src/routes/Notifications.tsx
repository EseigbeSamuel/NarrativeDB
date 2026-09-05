import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Notifications"!</div>
}
