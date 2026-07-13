import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/project/settings/Settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/project/settings/"!</div>
}
