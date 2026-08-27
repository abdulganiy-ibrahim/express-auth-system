import { Projects } from "@/components/dashboard/profile";
import { getProjects } from "@/lib/data/project.data";

type ProjectPageProps = {
  params: Promise<{
    userId: string;
  }>
}

export default async function ProjectsPage({ params }: ProjectPageProps) {
  const { userId } = await params;

  const projects = await getProjects();

  return (
    <div className="p-4">
      <section>
        <Projects projects={projects}/>
      </section>
    </div>
  )
}