import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org/project/narrative-assets/Variables')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/org/project/narrative-assets/Variables"!</div>
}
