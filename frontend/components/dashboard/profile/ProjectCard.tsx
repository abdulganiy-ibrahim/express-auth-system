import { Folder } from "lucide-react"

const projects = [
  {icon: Folder, title: 'Authentication system', desc: 'Express authentication system', createdAt: 'Aug 20, 2026'},
  {icon: Folder, title: 'Sellora', desc: 'Express authentication system', createdAt: 'Aug 20, 2026'}
]

export default function ProjectCard() {
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
                <p.icon className="text-bold text-primary" size={20} />
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold">{p.title}</h1>
                <p className="text-muted-foreground text-base">{p.desc}</p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-base">{p.createdAt}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}