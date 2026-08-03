import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { HugeiconsIcon } from '@hugeicons/react';
import { UserMultipleIcon, Comment01Icon, TaskDone01Icon, Location01Icon } from '@hugeicons/core-free-icons';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

export const Route = createFileRoute('/org/project/')({
  component: Dashboard,
})

const data = [
  { name: 'Jan', nodes: 400 },
  { name: 'Feb', nodes: 300 },
  { name: 'Mar', nodes: 200 },
  { name: 'Apr', nodes: 278 },
  { name: 'May', nodes: 189 },
  { name: 'Jun', nodes: 239 },
  { name: 'Jul', nodes: 349 },
]

function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Project Overview</h2>
        <div className="flex items-center space-x-2">
          {/* Action buttons could go here */}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur border-border/50 transition-all hover:bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Characters
            </CardTitle>
            <HugeiconsIcon icon={UserMultipleIcon} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              +14 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-border/50 transition-all hover:bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dialogue Nodes
            </CardTitle>
            <HugeiconsIcon icon={Comment01Icon} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,392</div>
            <p className="text-xs text-muted-foreground">
              +1,203 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-border/50 transition-all hover:bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quests</CardTitle>
            <HugeiconsIcon icon={TaskDone01Icon} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +2 new quests added
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-border/50 transition-all hover:bg-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              World Locations
            </CardTitle>
            <HugeiconsIcon icon={Location01Icon} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +7 from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Story Node Growth</CardTitle>
            <CardDescription>
              Nodes added to the narrative graph over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="nodes" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest changes to the narrative data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  title: 'Modified "Merchant Intro"',
                  desc: 'Updated dialogue tree branches.',
                  time: '2 hours ago',
                },
                {
                  title: 'Created Quest "The Lost Sword"',
                  desc: 'Added 3 objectives and rewards.',
                  time: '5 hours ago',
                },
                {
                  title: 'New Character "Elowen"',
                  desc: 'Added backstory and base stats.',
                  time: '1 day ago',
                },
                {
                  title: 'Updated Variable "is_king_dead"',
                  desc: 'Changed default state to false.',
                  time: '2 days ago',
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.desc}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
