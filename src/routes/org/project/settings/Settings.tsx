import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const Route = createFileRoute('/org/project/settings/Settings')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Settings</h2>
          <p className="text-muted-foreground">Manage your project configuration.</p>
        </div>
      </div>
      
      <div className="grid gap-4 mt-4 max-w-2xl">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>Basic project details and metadata.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Name</label>
              <Input defaultValue="The Whispering Woods" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                defaultValue="A dark fantasy RPG set in a mysterious forest."
                rows={3}
              />
            </div>
            <div className="pt-4">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-red-900/50">
          <CardHeader>
            <CardTitle className="text-red-500">Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border border-red-900/50 p-4 rounded-md">
              <div className="space-y-1">
                <p className="text-sm font-medium">Delete Project</p>
                <p className="text-xs text-muted-foreground">This will permanently delete the project and all narrative data.</p>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
