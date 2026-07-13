import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/org/project/narrative-assets/Characters',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/org/project/narrative-assets/Characters"!</div>
}
