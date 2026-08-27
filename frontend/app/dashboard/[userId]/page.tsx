import { LockIcon } from "lucide-react";
import { getUserById } from "@/lib/data/user.data";
import { getProjects } from "@/lib/data/project.data";
import {
  UserDataCard, Projects, ChangePasswordForm
} from "@/components/dashboard/profile";

type DashboardProps = {
  params: Promise<{
    userId: string
  }>
}

export default async function Dashboard({ params }: DashboardProps) {
  const { userId } = await params;

  const user = await getUserById(userId);
  const projects = await getProjects();  
  
  return (
    <div className="p-2">
      <section>
        <UserDataCard userData={user} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

        <div>
          <Projects projects={projects} />
        </div>

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