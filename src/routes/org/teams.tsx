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
import { Search01Icon, PlusSignIcon } from "@hugeicons/core-free-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const Route = createFileRoute("/org/teams")({
  component: TeamsPage,
})

const teamMembers = [
  {
    id: "usr_1",
    name: "Alice Walker",
    email: "alice@example.com",
    role: "Owner",
    status: "Active",
  },
  {
    id: "usr_2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "usr_3",
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "Editor",
    status: "Pending",
  },
  {
    id: "usr_4",
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Viewer",
    status: "Active",
  },
]

function TeamsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 space-y-4 overflow-y-auto p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">
            Manage organization members and their roles.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2 py-4">
        <div className="relative max-w-md flex-1">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search members by name or email..."
            className="bg-background pl-8"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border/50 bg-card/50 backdrop-blur">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow className="border-border/50">
              <TableHead className="w-100">Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow
                key={member.id}
                className="border-border/50 transition-colors hover:bg-muted/50"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${member.name}`}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {member.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`rounded border px-2 py-1 text-xs font-medium ${member.role === "Owner" ? "border-primary/50 bg-primary/10 text-primary" : "border-border text-muted-foreground"} `}
                  >
                    {member.role}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${member.status === "Active" ? "bg-green-500" : "bg-orange-500"}`}
                    />
                    <span className="text-sm text-muted-foreground">
                      {member.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Edit Role
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
