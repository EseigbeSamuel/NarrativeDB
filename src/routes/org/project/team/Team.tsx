import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/project/team/Team')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/project/team/"!</div>
}
