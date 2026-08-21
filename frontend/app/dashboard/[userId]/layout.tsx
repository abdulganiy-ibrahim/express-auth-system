import { PrivateHeader } from "@/components/layouts"

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    userId: string;
  }>
}

export default async function PrivateLayout({children, params}: LayoutProps) {
  const { userId } = await params;

  return (
    <div>
      <header>
        <PrivateHeader userId={userId} />
      </header>
      
      <main>
        {children}
      </main>
    </div>
  )
}