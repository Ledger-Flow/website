import { TableSkeletonRows } from "@/components/shared/DashboardSkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
  return (
    <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
      <Card className="overflow-clip lg:col-span-2">
        <CardHeader>
          <header className="flex items-end justify-between">
            <div className="w-33 space-y-1">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>

            <div className="w-43 space-y-1">
              <Skeleton className="ms-auto h-4 w-[90%]" />
              <Skeleton className="h-4 w-full" />
            </div>
          </header>
        </CardHeader>

        <CardContent>
          <main className="mt-3 mb-8 grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="mt-2 h-4 w-45" />
              <Skeleton className="h-4 w-45" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="mt-2 h-4 w-45" />
              <Skeleton className="h-4 w-45" />
            </div>
          </main>

          <TableSkeletonRows rowCount={2} />

          <ul className="ms-auto mt-8 w-full max-w-xs space-y-1.5">
            <li className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </li>
            <li className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="lg:sticky lg:top-0">
        <CardHeader>
          <Skeleton className="h-8 w-full max-w-50" />
        </CardHeader>

        <CardContent className="space-y-4">
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <Skeleton className="h-4 w-full max-w-25" />
              <Skeleton className="h-4 w-full max-w-30" />
            </li>
            <li className="flex items-center justify-between">
              <Skeleton className="h-4 w-full max-w-20" />
              <Skeleton className="h-4 w-full max-w-25" />
            </li>
          </ul>

          <div className="space-y-2 pt-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Loader;
