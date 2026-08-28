'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import ProjectList from "../ProjectList";
import Link from "next/link";
import type { Project } from '@/types'
import AddProjectButton from "../AddProjectButton";

type ProjectsProps = {
  projects: Project[];
  userId?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Projects({projects, userId}: ProjectsProps) {
  const router = useRouter();

  const handleDeleteProject = async (projectId: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/projects/${projectId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!res.ok) {
        throw new Error('Failed to delete project.');
      }

      router.refresh();
      toast.success('Project has been deleted successfully');
    } catch (err) {
      toast.error(
        err instanceof Error ?
        err.message :
        'Failed to delete project'
      );
    }
  }
  return (
    <>
      <section className="bg-background-card rounded-lg border border-border shadow-md p-4 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg">Your Projects</h1>

          <Link
            href={`/dashboard/${userId}/projects`}
            className="text-primary text-lg hover:border-b hover:border-primary transition-all duration-300"
          >
            View all
          </Link>
        </div>

        <div className="mt-2">
          <ProjectList 
            projects={projects} 
            onDelete={handleDeleteProject}
          />
        </div>

        <div className="mt-5">
          <AddProjectButton />
        </div>

      </section>
    </>
  )
}