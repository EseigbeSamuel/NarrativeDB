import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/org/teams")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/org/teams/"<div>fifif</div>!{" "}
    </div>
  )
}
