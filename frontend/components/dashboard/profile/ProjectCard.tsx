import { Folder } from "lucide-react"
import { Project } from "@/types"
import { formatDate } from "@/utils"

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectCard({projects}: ProjectListProps) {

  return (
    <>
      {
        projects.map((p) => (
          <div 
            key={p.title}
            className="bg-background-card rounded-lg shadow-lg p-2 flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Folder className="text-bold text-primary" size={20} />
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold">{p.title}</h1>
                <p className="text-muted-foreground text-base">{p.description}</p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-base">{formatDate(p.created_at)}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}