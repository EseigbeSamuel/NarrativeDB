import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/project/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/project/"!</div>
}
