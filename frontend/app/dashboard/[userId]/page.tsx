import Link from "next/link";
import { LockIcon } from "lucide-react";
import { getUserById } from "@/lib/data/user.data";
import { redirect } from "next/navigation";
import {
  UserDataCard, ProjectCard, ChangePasswordForm
} from "@/components/dashboard/profile";

type DashboardProps = {
  params: Promise<{
    userId: string
  }>
}

export default async function Dashboard({ params }: DashboardProps) {
  const { userId } = await params;

  const user = await getUserById(userId);  
  
  return (
    <div className="p-2">
      <section>
        <UserDataCard userData={user} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <section className="bg-background-card rounded-lg border border-border shadow-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg">Your Projects</h1>

            <Link
              href={`/dashboard`}
              className="text-primary text-lg hover:border-b hover:border-primary transition-all duration-300"
            >
              View all
            </Link>
          </div>

          <div className="mt-2">
            <ProjectCard />
          </div>
        </section>

        <section className="bg-background-card rounded-lg border border-border shadow-md p-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-lg">Change Password</h1>
            </div>

            <div className="text-primary/20 w-10 h-10">
              <LockIcon className="text-primary" size={20}/>
            </div>
          </div>

          <div>
            <ChangePasswordForm />
          </div>
        </section>
      </div>
    </div>
  )
}