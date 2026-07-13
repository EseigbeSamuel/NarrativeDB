import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/org-setting/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/org-setting/"!</div>
}
