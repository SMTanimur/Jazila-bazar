import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
interface LobbyLayoutProps {
  children: React.ReactNode
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  // const {data}= useMe()
  // const user = data
  // const {data:user}= useQuery(['me'],userClient.me)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader  />
      <main className="flex-1">{children}</main>
      <SiteFooter/>
    </div>
  )
}
