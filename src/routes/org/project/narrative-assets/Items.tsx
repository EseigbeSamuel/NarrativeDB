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
import { CubeIcon, PlusSignIcon, Search01Icon } from '@hugeicons/core-free-icons';

export const Route = createFileRoute('/org/project/narrative-assets/Items')({
  component: ItemsPage,
})

const items = [
  { id: 'ITM_001', name: 'Iron Sword', type: 'Weapon', rarity: 'Common' },
  { id: 'ITM_002', name: 'Health Potion', type: 'Consumable', rarity: 'Common' },
  { id: 'ITM_003', name: 'Amulet of Kings', type: 'Quest Item', rarity: 'Legendary' },
]

function ItemsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Items</h2>
          <p className="text-muted-foreground">Manage game items, equipment, and inventory.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            New Item
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 py-4">
        <div className="relative flex-1 max-w-sm">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
            className="pl-8 bg-background"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                <HugeiconsIcon icon={CubeIcon} className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
                <CardDescription className="text-xs">{item.type}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-xs text-muted-foreground mt-4">
                <span className={`px-2 py-1 rounded-md ${
                  item.rarity === 'Legendary' ? 'bg-orange-500/20 text-orange-400' : 'bg-secondary'
                }`}>
                  {item.rarity}
                </span>
                <span className="font-mono text-[10px]">{item.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
