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
import { HugeiconsIcon } from '@hugeicons/react';
import { FolderOpenIcon, PlusSignIcon, Search01Icon } from '@hugeicons/core-free-icons';

export const Route = createFileRoute(
  '/org/project/narrative-assets/StoryNodes',
)({
  component: StoryNodesPage,
})

const nodes = [
  { id: 'NODE_001', title: 'The Fall of Oakhaven', type: 'Cutscene', duration: '2m' },
  { id: 'NODE_002', title: 'Finding the Sword', type: 'Event', duration: 'Instant' },
  { id: 'NODE_003', title: 'King\'s Decree', type: 'Monologue', duration: '45s' },
]

function StoryNodesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Story Nodes</h2>
          <p className="text-muted-foreground">Manage standalone narrative events and cutscenes.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            New Node
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 py-4">
        <div className="relative flex-1 max-w-sm">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search story nodes..."
            className="pl-8 bg-background"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {nodes.map((node) => (
          <Card key={node.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                <HugeiconsIcon icon={FolderOpenIcon} className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold">{node.title}</CardTitle>
                <CardDescription className="text-xs font-mono">{node.id}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-xs text-muted-foreground mt-4">
                <span className="bg-secondary/50 px-2 py-1 rounded-md">{node.type}</span>
                <span>{node.duration}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
