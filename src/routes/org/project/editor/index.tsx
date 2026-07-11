import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/project/editor/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/project/editor/"!</div>
}
