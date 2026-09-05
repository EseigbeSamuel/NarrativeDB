import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/Otp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(auth)/Otp"!</div>
}
