import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Addresses Information',
  description: 'Manage your Addresses settings',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <section >
  
      {children}
    </section>
  );
}