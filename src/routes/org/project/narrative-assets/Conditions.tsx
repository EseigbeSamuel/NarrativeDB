import { createFileRoute } from "@tanstack/react-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon, Search01Icon } from "@hugeicons/core-free-icons"

export const Route = createFileRoute(
  "/org/project/narrative-assets/Conditions"
)({
  component: ConditionsPage,
})

const conditions = [
  {
    id: "COND_001",
    name: "Has Sword",
    expression: 'player_inventory.contains("ITM_001")',
    type: "Expression",
  },
  {
    id: "COND_002",
    name: "Is Night",
    expression: "world_time > 18 || world_time < 6",
    type: "Expression",
  },
  {
    id: "COND_003",
    name: "Completed Tutorial",
    expression: 'quest_status("QST_MAIN_01") == "completed"',
    type: "State Check",
  },
]

function ConditionsPage() {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Conditions</h2>
          <p className="text-muted-foreground">
            Manage logical expressions and prerequisites.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            New Condition
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2 py-4">
        <div className="relative max-w-sm flex-1">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search conditions..."
            className="bg-background pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border border-border/50 bg-card/50 backdrop-blur">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="w-50">Name</TableHead>
              <TableHead>Expression</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conditions.map((cond) => (
              <TableRow key={cond.id} className="border-border/50">
                <TableCell className="font-medium text-primary">
                  {cond.name}
                </TableCell>
                <TableCell className="my-1 block w-max rounded bg-secondary/30 p-2 font-mono text-xs text-muted-foreground">
                  {cond.expression}
                </TableCell>
                <TableCell>
                  <span className="rounded bg-secondary px-2 py-1 text-xs">
                    {cond.type}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
