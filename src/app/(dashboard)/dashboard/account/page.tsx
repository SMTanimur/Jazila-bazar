import type { Metadata } from "next"


import { Shell } from "@/components/shells/shell"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/common/shared/page-header"

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
}

export default function AccountPage() {
  return (
    <Shell variant="sidebar">
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="w-full overflow-hidden"
      >
        helldjf
      </section>
    </Shell>
  )
}
