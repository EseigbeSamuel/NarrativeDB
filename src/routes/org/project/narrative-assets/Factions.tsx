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
import { Flag01Icon, PlusSignIcon, Search01Icon } from '@hugeicons/core-free-icons';

export const Route = createFileRoute('/org/project/narrative-assets/Factions')({
  component: FactionsPage,
})

const factions = [
  { id: 'FAC_001', name: 'The Resistance', leader: 'Elowen', status: 'Hostile' },
  { id: 'FAC_002', name: 'The Order', leader: 'Vex', status: 'Allied' },
  { id: 'FAC_003', name: 'Merchant Guild', leader: 'Kael', status: 'Neutral' },
]

function FactionsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Factions</h2>
          <p className="text-muted-foreground">Manage factions, allegiances, and reputation.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            New Faction
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 py-4">
        <div className="relative flex-1 max-w-sm">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search factions..."
            className="pl-8 bg-background"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {factions.map((fac) => (
          <Card key={fac.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">{fac.name}</CardTitle>
                <CardDescription className="text-xs">Leader: {fac.leader}</CardDescription>
              </div>
              <HugeiconsIcon icon={Flag01Icon} className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex items-center">
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  fac.status === 'Hostile' ? 'bg-red-500/20 text-red-500' :
                  fac.status === 'Allied' ? 'bg-green-500/20 text-green-500' :
                  'bg-secondary text-secondary-foreground'
                }`}>
                  Status: {fac.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
