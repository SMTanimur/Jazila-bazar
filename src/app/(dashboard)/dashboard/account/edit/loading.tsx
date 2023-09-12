import { Skeleton } from "@/components/ui/skeleton"

import { Shell } from "@/components/shells/shell"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/common/shared/page-header"
import { Card } from "@/components/ui/card"

export default function AccountEditLoading() {
  return (
    <Shell variant="sidebar">
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex justify-between">
        <Card>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="grid gap-10 rounded-lg border p-4"
      >
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        
      </section>
      </Card>
      <Card>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="grid gap-10 rounded-lg border p-4"
      >
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        
      </section>
      </Card>
      </div>
      
    </Shell>
  )
}
