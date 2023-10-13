import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Account Information',
  description: 'Manage your account settings',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section >{children}</section>;
}