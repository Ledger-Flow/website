import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { generateRandomNumber } from "@/utils/generator";

export function DashboardSkeletonOverview() {
  return (
    <div className="space-y-4">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-8 w-24" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="mb-2 h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="flex h-80 items-end justify-around gap-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton
                key={i}
                className="w-12 flex-1"
                style={{ height: generateRandomNumber(200, 50) }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Sales Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TableSkeletonRows({ rowCount = 8 }: { rowCount?: number }) {
  return (
    <>
      {[...Array(rowCount)].map((_, i) => (
        <div
          key={i}
          className="border-b-input flex items-center space-x-4 border-b p-2"
        >
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <div className="flex-1" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      ))}
    </>
  );
}

export function CardGridSkeleton({ cardCount = 6 }: { cardCount?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(cardCount)].map((_, i) => (
        <Card key={i} className="transition-shadow hover:shadow-md">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-8 w-8 rounded" />
              </div>
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function InvoiceTableSkeleton({ rowCount = 6 }: { rowCount?: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-10 w-40" />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">
                  <Skeleton className="h-4 w-6" />
                </th>
                <th className="p-4 text-left">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="p-4 text-left">
                  <Skeleton className="h-4 w-32" />
                </th>
                <th className="p-4 text-left">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="p-4 text-left">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="p-4 text-left">
                  <Skeleton className="h-4 w-20" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(rowCount)].map((_, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-6" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-32" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-20" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                  <th className="p-4 text-left">
                    <Skeleton className="h-4 w-20" />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <Skeleton className="size-20 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Sections */}
      {[...Array(2)].map((_, sectionIdx) => (
        <Card key={sectionIdx}>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(2)].map((_, fieldIdx) => (
              <div key={fieldIdx} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <Skeleton
              className={cn("bg-primary/50 h-12 w-full max-w-xs rounded-lg", {
                "bg-muted": i % 2 === 0,
              })}
            />
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  );
}
