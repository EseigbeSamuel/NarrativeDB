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
import { Location01Icon, PlusSignIcon, Search01Icon } from '@hugeicons/core-free-icons';

export const Route = createFileRoute(
  '/org/project/narrative-assets/Locations',
)({
  component: LocationsPage,
})

const locations = [
  { id: 'LOC_001', name: 'Oakhaven', region: 'The Whispering Woods', type: 'Village' },
  { id: 'LOC_002', name: 'Dragon\'s Peak', region: 'The Northern Reaches', type: 'Dungeon' },
  { id: 'LOC_003', name: 'Silver City', region: 'Central Plains', type: 'Capital' },
]

function LocationsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Locations</h2>
          <p className="text-muted-foreground">Manage world regions, cities, and points of interest.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            New Location
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 py-4">
        <div className="relative flex-1 max-w-sm">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search locations..."
            className="pl-8 bg-background"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <Card key={loc.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold">{loc.name}</CardTitle>
                  <CardDescription className="text-xs">{loc.region}</CardDescription>
                </div>
                <HugeiconsIcon icon={Location01Icon} className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex items-center">
                <span className="text-xs font-medium px-2 py-1 rounded bg-secondary text-secondary-foreground">
                  {loc.type}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
