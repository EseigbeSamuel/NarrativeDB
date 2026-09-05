import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/ForgetPassword')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/ForgetPassword"!</div>
}
