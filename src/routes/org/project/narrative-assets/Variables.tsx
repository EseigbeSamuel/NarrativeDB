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

export const Route = createFileRoute("/org/project/narrative-assets/Variables")(
  {
    component: VariablesPage,
  }
)

const variables = [
  { key: "has_sword", type: "Boolean", defaultValue: "false", scope: "Global" },
  { key: "player_gold", type: "Integer", defaultValue: "100", scope: "Player" },
  {
    key: "faction_rep_order",
    type: "Integer",
    defaultValue: "0",
    scope: "Global",
  },
  { key: "current_quest", type: "String", defaultValue: '""', scope: "Player" },
]

function VariablesPage() {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Variables</h2>
          <p className="text-muted-foreground">
            Global and player-scoped game state variables.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            New Variable
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
            placeholder="Search variables..."
            className="bg-background pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border border-border/50 bg-card/50 backdrop-blur">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="w-75">Key</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default Value</TableHead>
              <TableHead>Scope</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variables.map((v) => (
              <TableRow key={v.key} className="border-border/50">
                <TableCell className="font-mono font-medium text-primary">
                  {v.key}
                </TableCell>
                <TableCell>
                  <span className="rounded bg-secondary px-2 py-1 text-xs">
                    {v.type}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-muted-foreground">
                  {v.defaultValue}
                </TableCell>
                <TableCell>{v.scope}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
