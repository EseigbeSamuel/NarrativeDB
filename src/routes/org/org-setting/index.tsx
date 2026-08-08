import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/org/org-setting/')({
  component: OrgSettingsPage,
})

function OrgSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Organization Settings</h2>
          <p className="text-muted-foreground">Manage your organization's profile and preferences.</p>
        </div>
      </div>
      
      <div className="grid gap-6 mt-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Organization Profile</CardTitle>
            <CardDescription>Update your organization's display name and URL slug.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" defaultValue="Eseigbe Studios" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-slug">URL Slug</Label>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground text-sm bg-secondary px-3 py-2 rounded-md border border-border">narrativedb.com/org/</span>
                <Input id="org-slug" defaultValue="eseigbe-studios" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/50 pt-6">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-red-900/50">
          <CardHeader>
            <CardTitle className="text-red-500">Danger Zone</CardTitle>
            <CardDescription>Irreversible destructive actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border border-red-900/50 p-4 rounded-md">
              <div className="space-y-1">
                <p className="text-sm font-medium">Delete Organization</p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete this organization, all projects, and all narrative data. This action cannot be undone.
                </p>
              </div>
              <Button variant="destructive" className="shrink-0">Delete Organization</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
