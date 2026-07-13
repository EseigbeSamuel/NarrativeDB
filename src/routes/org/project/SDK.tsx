import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/project/SDK')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/project/sdk/"!</div>
}
