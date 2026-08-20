import { useState, useMemo } from "react"
import { createFileRoute } from "@tanstack/react-router"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ChartHistogramIcon,
  FolderOpenIcon,
  Search01Icon,
  CheckmarkCircle01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export const Route = createFileRoute("/org/analytics/Analytics")({
  component: AnalyticsDashboard,
})

// Data mock datasets for time periods
const TIME_PERIOD_DATA = {
  "7d": {
    totalRequests: "248,920",
    totalRequestsTrend: "+14.2%",
    avgLatency: "38 ms",
    avgLatencyTrend: "-6 ms",
    totalTokens: "3.42 M",
    tokensTrend: "+8.1%",
    successRate: "99.94%",
    timeSeries: [
      { date: "Mon", requests: 31200, latency: 42, errorRate: 0.02 },
      { date: "Tue", requests: 34500, latency: 39, errorRate: 0.01 },
      { date: "Wed", requests: 38900, latency: 36, errorRate: 0.03 },
      { date: "Thu", requests: 36100, latency: 38, errorRate: 0.02 },
      { date: "Fri", requests: 42000, latency: 35, errorRate: 0.01 },
      { date: "Sat", requests: 32800, latency: 40, errorRate: 0.02 },
      { date: "Sun", requests: 33420, latency: 37, errorRate: 0.01 },
    ],
  },
  "30d": {
    totalRequests: "1,042,300",
    totalRequestsTrend: "+22.5%",
    avgLatency: "41 ms",
    avgLatencyTrend: "-3 ms",
    totalTokens: "14.8 M",
    tokensTrend: "+19.4%",
    successRate: "99.89%",
    timeSeries: [
      { date: "Week 1", requests: 220000, latency: 44, errorRate: 0.04 },
      { date: "Week 2", requests: 245000, latency: 41, errorRate: 0.03 },
      { date: "Week 3", requests: 278000, latency: 39, errorRate: 0.02 },
      { date: "Week 4", requests: 299300, latency: 38, errorRate: 0.02 },
    ],
  },
  "90d": {
    totalRequests: "3,120,500",
    totalRequestsTrend: "+35.1%",
    avgLatency: "44 ms",
    avgLatencyTrend: "-12 ms",
    totalTokens: "42.1 M",
    tokensTrend: "+28.7%",
    successRate: "99.82%",
    timeSeries: [
      { date: "May", requests: 890000, latency: 52, errorRate: 0.06 },
      { date: "Jun", requests: 1050000, latency: 44, errorRate: 0.04 },
      { date: "Jul", requests: 1180500, latency: 39, errorRate: 0.02 },
    ],
  },
}

// Story node evaluation traversal counts by project
const NODE_TRAVERSAL_DATA = [
  {
    category: "Dialogue Branches",
    whispering: 45000,
    cybernetic: 62000,
    tavern: 18000,
  },
  {
    category: "State Evaluators",
    whispering: 38000,
    cybernetic: 49000,
    tavern: 14000,
  },
  {
    category: "Quest Triggers",
    whispering: 29000,
    cybernetic: 31000,
    tavern: 9500,
  },
  {
    category: "Inventory Checks",
    whispering: 18000,
    cybernetic: 24000,
    tavern: 12000,
  },
  {
    category: "AI Lore Nodes",
    whispering: 24000,
    cybernetic: 19000,
    tavern: 6000,
  },
]

// AI Token consumption by model
const MODEL_TOKEN_DATA = [
  { name: "GPT-4o (Narrative)", value: 48, color: "#6366f1" },
  { name: "Claude 3.5 (Dialogue)", value: 34, color: "#10b981" },
  { name: "DeepSeek R1 (World Rules)", value: 18, color: "#f59e0b" },
]

// Endpoint telemetry details
const ENDPOINT_TELEMETRY = [
  {
    path: "/api/v1/narrative/evaluate",
    method: "POST",
    project: "The Whispering Woods",
    requests: "112,400",
    avgLatency: "34 ms",
    p99Latency: "82 ms",
    cacheHit: "89.4%",
    status: "Healthy",
  },
  {
    path: "/api/v1/dialogue/next",
    method: "POST",
    project: "Cybernetic Dreams",
    requests: "88,920",
    avgLatency: "29 ms",
    p99Latency: "64 ms",
    cacheHit: "94.1%",
    status: "Healthy",
  },
  {
    path: "/api/v1/lore/generate",
    method: "POST",
    project: "The Whispering Woods",
    requests: "24,150",
    avgLatency: "410 ms",
    p99Latency: "980 ms",
    cacheHit: "42.0%",
    status: "Healthy",
  },
  {
    path: "/api/v1/state/query",
    method: "GET",
    project: "Tavern Tales",
    requests: "18,400",
    avgLatency: "18 ms",
    p99Latency: "35 ms",
    cacheHit: "97.8%",
    status: "Healthy",
  },
  {
    path: "/api/v1/quest/check-conditions",
    method: "POST",
    project: "Cybernetic Dreams",
    requests: "5,050",
    avgLatency: "52 ms",
    p99Latency: "140 ms",
    cacheHit: "76.2%",
    status: "Degraded",
  },
]

function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d")
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const activeData = TIME_PERIOD_DATA[timeRange]

  // Filtered telemetry endpoints based on search & project
  const filteredEndpoints = useMemo(() => {
    return ENDPOINT_TELEMETRY.filter((ep) => {
      const matchesSearch =
        ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.project.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesProject =
        selectedProject === "all" ||
        (selectedProject === "whispering" &&
          ep.project === "The Whispering Woods") ||
        (selectedProject === "cybernetic" &&
          ep.project === "Cybernetic Dreams") ||
        (selectedProject === "tavern" && ep.project === "Tavern Tales")

      return matchesSearch && matchesProject
    })
  }, [searchQuery, selectedProject])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 600)
  }

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 space-y-6 overflow-y-auto p-8 pt-6">
      {/* Header Toolbar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Organization Analytics
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time telemetry, node evaluations, latency metrics, and token
            consumption.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Project Filter Buttons */}
          <div className="flex items-center rounded-xl border border-border/60 bg-card/60 p-1 text-xs font-medium">
            <button
              onClick={() => setSelectedProject("all")}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                selectedProject === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setSelectedProject("whispering")}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                selectedProject === "whispering"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Whispering Woods
            </button>
            <button
              onClick={() => setSelectedProject("cybernetic")}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                selectedProject === "cybernetic"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Cybernetic
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center rounded-xl border border-border/50 bg-muted/60 p-1 text-xs font-medium">
            {(["7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-lg px-3 py-1.5 transition-all ${
                  timeRange === range
                    ? "bg-background font-semibold text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="h-9 gap-2 border-border/60 px-3"
          >
            <HugeiconsIcon
              icon={Loading03Icon}
              className={`h-4 w-4 ${isRefreshing ? "animate-spin text-primary" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Top Metric KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: API Volume */}
        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Total Requests
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HugeiconsIcon icon={ChartHistogramIcon} size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeData.totalRequests}</div>
            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-500">
              <HugeiconsIcon icon={ArrowUp01Icon} size={14} />
              <span>{activeData.totalRequestsTrend}</span>
              <span className="ml-1 font-normal text-muted-foreground">
                vs prev period
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Avg Latency */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Avg Node Latency
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeData.avgLatency}</div>
            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-500">
              <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
              <span>{activeData.avgLatencyTrend}</span>
              <span className="ml-1 font-normal text-muted-foreground">
                faster execution
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: AI Tokens */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              AI Lore Tokens
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
              <HugeiconsIcon icon={FolderOpenIcon} size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeData.totalTokens}</div>
            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-indigo-400">
              <HugeiconsIcon icon={ArrowUp01Icon} size={14} />
              <span>{activeData.tokensTrend}</span>
              <span className="ml-1 font-normal text-muted-foreground">
                token usage
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Success Rate */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Query Success Rate
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeData.successRate}</div>
            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-500">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>99.9% 2xx Status</span>
              <span className="ml-1 font-normal text-muted-foreground">
                (0.01% 5xx)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left 2 Cols: Request Throughput & Latency Trend */}
        <Card className="flex flex-col border-border/50 bg-card/50 backdrop-blur md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">
                Throughput & P95 Latency
              </CardTitle>
              <CardDescription>
                Daily API request volume mapped against P95 response latency (
                {timeRange.toUpperCase()})
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="min-h-75 flex-1 pt-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={activeData.timeSeries}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorRequests"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.15}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
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
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
                  }}
                  itemStyle={{ color: "#fff", fontSize: "13px" }}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  name="Requests"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRequests)"
                />
                <Area
                  type="monotone"
                  dataKey="latency"
                  name="Latency (ms)"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLatency)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Right 1 Col: AI Token Distribution Donut Chart */}
        <Card className="flex flex-col border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              AI Token Distribution
            </CardTitle>
            <CardDescription>
              Breakdown by generation model & parser
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={MODEL_TOKEN_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {MODEL_TOKEN_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                  }}
                  formatter={(value: any) => [
                    `${value}% of total tokens`,
                    "Share",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-2 w-full space-y-2 text-xs">
              {MODEL_TOKEN_DATA.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Chart: Story Node Traversal Breakdown */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">
              Narrative Node Traversal Breakdown
            </CardTitle>
            <CardDescription>
              Evaluated story node types across active organization projects
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={NODE_TRAVERSAL_DATA}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.15}
                vertical={false}
              />
              <XAxis
                dataKey="category"
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />
              <Bar
                dataKey="whispering"
                name="The Whispering Woods"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="cybernetic"
                name="Cybernetic Dreams"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="tavern"
                name="Tavern Tales"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Endpoint Telemetry Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="text-lg font-bold">
              Endpoint Telemetry & Performance
            </CardTitle>
            <CardDescription>
              Latency percentiles, request count, and cache efficiency
            </CardDescription>
          </div>

          <div className="relative w-full sm:w-64">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Filter endpoint..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 rounded-xl border-border/60 bg-background/50 pl-9 text-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/50">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="text-xs font-semibold">
                    Endpoint Path
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Project
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold">
                    Requests
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold">
                    Avg Latency
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold">
                    P99 Latency
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold">
                    Cache Hit
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEndpoints.length > 0 ? (
                  filteredEndpoints.map((ep, idx) => (
                    <TableRow
                      key={idx}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <TableCell className="flex items-center gap-2 font-mono text-xs font-medium">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${
                            ep.method === "POST"
                              ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"
                              : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          {ep.method}
                        </span>
                        {ep.path}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {ep.project}
                      </TableCell>
                      <TableCell className="text-right text-xs font-medium">
                        {ep.requests}
                      </TableCell>
                      <TableCell className="text-right text-xs font-medium text-emerald-400">
                        {ep.avgLatency}
                      </TableCell>
                      <TableCell className="text-right text-xs font-medium text-muted-foreground">
                        {ep.p99Latency}
                      </TableCell>
                      <TableCell className="text-right text-xs font-medium">
                        {ep.cacheHit}
                      </TableCell>
                      <TableCell className="text-center text-xs">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            ep.status === "Healthy"
                              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {ep.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-6 text-center text-xs text-muted-foreground"
                    >
                      No matching endpoints found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
