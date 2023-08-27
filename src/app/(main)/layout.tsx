import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
interface LobbyLayoutProps {
  children: React.ReactNode
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {


  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={null} />
      <main className="flex-1">{children}</main>
      <SiteFooter/>
    </div>
  )
}
