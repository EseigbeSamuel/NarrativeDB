import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/analytics/Analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/analytics/Analytics"!</div>
}
