
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockPlans, mockSubscription, getCurrentPlan } from "@/lib/mock-data";
import {
  CreditCard,
  Check,
  Zap,
  Users,
  MessageSquare,
  TrendingUp,
  Crown,
  ArrowRight,
  Calendar,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

interface WorkspacePlanSettingsProps {
  workspaceId: string;
}

export function WorkspacePlanSettings({ workspaceId }: WorkspacePlanSettingsProps) {
  const [subscription, setSubscription] = useState(mockSubscription);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(subscription.billing_period);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

  const currentPlan = getCurrentPlan();
  const seatsUsagePercent = (subscription.used_seats / subscription.seats) * 100;

  const handleUpgradePlan = (planId: string) => {
    setSelectedPlan(planId);
    setUpgradeDialogOpen(true);
  };

  const confirmUpgrade = () => {
    // Simulate upgrade
    setUpgradeDialogOpen(false);
    setSelectedPlan(null);
  };

  const getPrice = (plan: typeof mockPlans[0]) => {
    return billingPeriod === "yearly" ? plan.price_yearly : plan.price_monthly;
  };

  const getMonthlySavings = (plan: typeof mockPlans[0]) => {
    if (billingPeriod === "yearly" && plan.price_yearly > 0) {
      const monthlyTotal = plan.price_monthly * 12;
      const savings = monthlyTotal - plan.price_yearly;
      return savings > 0 ? Math.round(savings) : 0;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Your subscription details and usage
              </CardDescription>
            </div>
            <Badge variant="default" className="gap-1">
              {subscription.status === "active" && <Check className="h-3 w-3" />}
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                <Crown className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-lg font-semibold">{currentPlan?.name} Plan</div>
                <p className="text-sm text-muted-foreground">
                  ${getPrice(currentPlan!)} / {billingPeriod === "monthly" ? "month" : "year"}
                </p>
              </div>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Billing Period</span>
                <span className="font-medium">
                  {subscription.billing_period === "monthly" ? "Monthly" : "Yearly"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current Period</span>
                <span className="font-medium">
                  {format(new Date(subscription.current_period_start), "MMM d")} -{" "}
                  {format(new Date(subscription.current_period_end), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="font-medium">
                  {format(new Date(subscription.current_period_end), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Team Seats</span>
              </div>
              <span className="font-medium">
                {subscription.used_seats} / {subscription.seats} used
              </span>
            </div>
            <Progress value={seatsUsagePercent} className="h-2" />
            {seatsUsagePercent > 80 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>You're running low on seats. Consider upgrading your plan.</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>
                Choose the plan that fits your team
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="billing-toggle" className="text-sm">Monthly</Label>
              <Switch
                id="billing-toggle"
                checked={billingPeriod === "yearly"}
                onCheckedChange={(checked) => setBillingPeriod(checked ? "yearly" : "monthly")}
              />
              <Label htmlFor="billing-toggle" className="text-sm">
                Yearly
                <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockPlans.map((plan) => {
              const price = getPrice(plan);
              const savings = getMonthlySavings(plan);
              const isCurrentPlan = plan.id === `plan-${subscription.plan}`;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-lg border-2 p-6 ${
                    plan.popular
                      ? "border-primary shadow-lg scale-105"
                      : "border-border"
                  } ${isCurrentPlan ? "bg-accent/50" : "bg-card"}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {plan.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">${price}</span>
                        <span className="text-muted-foreground">
                          /{billingPeriod === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      {savings > 0 && (
                        <p className="text-xs text-primary mt-1">
                          Save ${savings}/year
                        </p>
                      )}
                    </div>

                    {isCurrentPlan ? (
                      <Button variant="outline" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleUpgradePlan(plan.id)}
                      >
                        {plan.price_monthly > (currentPlan?.price_monthly || 0)
                          ? "Upgrade"
                          : "Downgrade"}
                      </Button>
                    )}

                    <div className="space-y-2 pt-4 border-t">
                      {plan.features.slice(0, 5).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          {feature.included ? (
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <div className="h-4 w-4 shrink-0 mt-0.5" />
                          )}
                          <span className={!feature.included ? "text-muted-foreground line-through" : ""}>
                            {feature.name}:{" "}
                            {feature.limit !== null
                              ? feature.limit.toLocaleString()
                              : feature.description || "Unlimited"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Manage your billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-primary flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-medium">Visa ending in 4242</div>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Next billing: {format(new Date(subscription.current_period_end), "MMMM d, yyyy")}</span>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View and download your invoices
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "2024-12-01", amount: 79, status: "paid" },
              { date: "2024-11-01", amount: 79, status: "paid" },
              { date: "2024-10-01", amount: 79, status: "paid" },
            ].map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {format(new Date(invoice.date), "MMMM d, yyyy")}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Professional Plan - ${invoice.amount}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Dialog */}
      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Plan Change</DialogTitle>
            <DialogDescription>
              You're about to change your subscription plan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedPlan && (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <span className="font-medium">New Plan</span>
                  <span className="font-semibold">
                    {mockPlans.find((p) => p.id === selectedPlan)?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <span className="font-medium">Billing Amount</span>
                  <span className="font-semibold">
                    ${getPrice(mockPlans.find((p) => p.id === selectedPlan)!)} /{" "}
                    {billingPeriod === "monthly" ? "month" : "year"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your card will be charged immediately and your plan will be updated.
                  Any unused time on your current plan will be prorated.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmUpgrade}>
              Confirm Change
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
