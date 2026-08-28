'use client';

import { Folder, Pencil, Trash2 } from 'lucide-react';
import type { Project } from '@/types';
import { formatDate } from '@/utils';

type ProjectListProps = {
  projects: Project[];
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
};

export default function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  return (
    <div className="flex flex-col gap-3">
      {projects.map((p) => (
        <div
          key={p.title}
          className="flex flex-col gap-3 rounded-xl border border-border/10 bg-background-card p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Folder className="text-primary" size={20} strokeWidth={2.25} />
            </div>

            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.description}</p>

              <p className="mt-4 text-xs text-muted-foreground">
                {formatDate(p.created_at)}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3">

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onEdit?.(p.id)}
                aria-label={`Edit ${p.title}`}
                className="group relative rounded-lg p-2 text-muted-foreground cursor-pointer transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <Pencil size={18} strokeWidth={2} />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                  Edit
                </span>
              </button>

              <button
                type="button"
                onClick={() => onDelete?.(p.id)}
                aria-label={`Delete ${p.title}`}
                className="group relative rounded-lg p-2 text-muted-foreground cursor-pointer transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={18} strokeWidth={2} />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                  Delete
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}