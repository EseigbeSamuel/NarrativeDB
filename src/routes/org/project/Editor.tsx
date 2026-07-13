import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/project/Editor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/project/editor/"!</div>
}
