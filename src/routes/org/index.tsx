import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon, FolderOpenIcon } from '@hugeicons/core-free-icons'

export const Route = createFileRoute('/org/')({
  component: OrgDashboard,
})

const projects = [
  { 
    id: 'prj_whispering_woods', 
    name: 'The Whispering Woods', 
    description: 'A dark fantasy RPG set in a mysterious forest.',
    lastUpdated: '2 hours ago',
    members: 4,
    status: 'Active'
  },
  { 
    id: 'prj_cybernetic_dreams', 
    name: 'Cybernetic Dreams', 
    description: 'Sci-fi visual novel with branching timelines.',
    lastUpdated: '1 day ago',
    members: 2,
    status: 'Active'
  },
  { 
    id: 'prj_tavern_tales', 
    name: 'Tavern Tales', 
    description: 'Cozy inn management simulator dialogue trees.',
    lastUpdated: '1 week ago',
    members: 1,
    status: 'Draft'
  },
]

function OrgDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage your organization's narrative projects.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all flex flex-col group">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
                <CardDescription className="text-sm line-clamp-2 mt-2 h-10">{project.description}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                <span className="text-lg">⋮</span>
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>Updated {project.lastUpdated}</span>
                <span className="flex items-center gap-1">
                  <HugeiconsIcon icon={FolderOpenIcon} size={14} />
                  {project.members} {project.members === 1 ? 'member' : 'members'}
                </span>
              </div>
              
              <Link to="/org/project" className="w-full">
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  Open Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
