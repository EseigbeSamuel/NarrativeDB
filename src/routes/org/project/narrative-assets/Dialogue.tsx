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
import { Comment01Icon, PlusSignIcon, Search01Icon } from '@hugeicons/core-free-icons';

export const Route = createFileRoute('/org/project/narrative-assets/Dialogue')({
  component: DialoguePage,
})

const dialogues = [
  { id: 'DIA_001', name: 'Tavern Intro', nodes: 15, updated: '2 hours ago' },
  { id: 'DIA_002', name: 'Merchant Trade', nodes: 8, updated: '1 day ago' },
  { id: 'DIA_003', name: 'King\'s Audience', nodes: 42, updated: '3 days ago' },
  { id: 'DIA_004', name: 'Bandit Ambush', nodes: 12, updated: '1 week ago' },
]

function DialoguePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dialogue Trees</h2>
          <p className="text-muted-foreground">Manage branching conversations and sequences.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            New Dialogue Tree
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 py-4">
        <div className="relative flex-1 max-w-sm">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search dialogue trees..."
            className="pl-8 bg-background"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dialogues.map((dia) => (
          <Card key={dia.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold">{dia.name}</CardTitle>
                  <CardDescription className="text-xs font-mono">{dia.id}</CardDescription>
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center">
                  <HugeiconsIcon icon={Comment01Icon} className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground mt-2 border-t border-border/50 pt-4">
                <span>{dia.nodes} Nodes</span>
                <span>Updated {dia.updated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
