import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { HugeiconsIcon } from '@hugeicons/react'
import { CreditCardIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons'

export const Route = createFileRoute('/org/billing')({
  component: BillingPage,
})

function BillingPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 overflow-y-auto w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing & Usage</h2>
          <p className="text-muted-foreground">Manage your subscription and monitor platform limits.</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <Card className="md:col-span-2 bg-card/50 backdrop-blur border-border/50 flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <HugeiconsIcon icon={CreditCardIcon} size={24} className="text-primary" />
              Current Plan: Pro Tier
            </CardTitle>
            <CardDescription>
              Your plan renews on September 1, 2026 for $49.00/month.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>API Requests</span>
                <span className="text-muted-foreground">240,000 / 1,000,000</span>
              </div>
              <Progress value={24} className="h-2 bg-secondary" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Storage</span>
                <span className="text-muted-foreground">4.2 GB / 20 GB</span>
              </div>
              <Progress value={21} className="h-2 bg-secondary" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Team Members</span>
                <span className="text-muted-foreground">4 / 10</span>
              </div>
              <Progress value={40} className="h-2 bg-secondary" />
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/50 pt-6">
            <div className="flex w-full justify-between items-center">
              <Button variant="outline">Manage Payment Method</Button>
              <Button variant="secondary">View Invoice History</Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Upgrade to Enterprise</CardTitle>
            <CardDescription>Get unlimited everything and priority support.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">$199<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} className="text-primary h-4 w-4" />
                Unlimited API Requests
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} className="text-primary h-4 w-4" />
                Unlimited Storage
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} className="text-primary h-4 w-4" />
                SAML SSO
              </li>
              <li className="flex items-center gap-2">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} className="text-primary h-4 w-4" />
                Dedicated Success Manager
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
