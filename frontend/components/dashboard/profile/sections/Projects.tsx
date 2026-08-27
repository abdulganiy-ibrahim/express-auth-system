'use client';
import { useState } from "react";
import ProjectList from "../ProjectList";
import Link from "next/link";
import type { Project } from '@/types'
import AddProjectButton from "../AddProjectButton";

type ProjectsProps = {
  projects: Project[];
}

export default function Projects({projects}: ProjectsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }
  return (
    <>
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
          <ProjectList projects={projects}/>
        </div>

        <div className="mt-5">
          <AddProjectButton />
        </div>

      </section>
    </>
  )
}