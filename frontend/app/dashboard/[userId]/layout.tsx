import { PrivateHeader } from "@/components/layouts";
import { PrivateSidebar } from "@/components/layouts/";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    userId: string;
  }>;
};

export default async function PrivateLayout({ children, params }: LayoutProps) {
  const { userId } = await params;

  return (
    <div className="flex min-h-screen">
      <PrivateSidebar userId={userId} />

      <div className="flex min-w-0 flex-1 flex-col">
        <PrivateHeader userId={userId} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}