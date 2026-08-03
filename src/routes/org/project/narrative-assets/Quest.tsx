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
import { TaskDone01Icon, PlusSignIcon, Search01Icon } from '@hugeicons/core-free-icons';

export const Route = createFileRoute('/org/project/narrative-assets/Quest')({
  component: QuestPage,
})

const quests = [
  { id: 'QST_MAIN_01', name: 'The Awakening', type: 'Main Story', status: 'Published' },
  { id: 'QST_SIDE_04', name: 'Lost Locket', type: 'Side Quest', status: 'Draft' },
  { id: 'QST_FACT_02', name: 'Prove Your Worth', type: 'Faction', status: 'Review' },
]

function QuestPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quests</h2>
          <p className="text-muted-foreground">Manage game quests, objectives, and rewards.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            New Quest
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 py-4">
        <div className="relative flex-1 max-w-sm">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search quests..."
            className="pl-8 bg-background"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quests.map((quest) => (
          <Card key={quest.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">{quest.name}</CardTitle>
                  <CardDescription className="text-xs font-mono">{quest.id}</CardDescription>
                </div>
                <HugeiconsIcon icon={TaskDone01Icon} className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-xs mt-4">
                <span className="bg-secondary px-2 py-1 rounded-md text-muted-foreground">{quest.type}</span>
                <span className={`px-2 py-1 rounded-md ${quest.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                  {quest.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
