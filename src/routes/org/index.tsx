import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/"!</div>
}
