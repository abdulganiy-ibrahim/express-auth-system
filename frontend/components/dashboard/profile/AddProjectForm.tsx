'use client';
import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Modal } from '@/components/ui';
import { toast } from 'sonner';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type AddProjectFormProps = {
  modalOpen: boolean;
  onClose?: () => void;
  onCreated?: (project: unknown) => void;
};

type ProjectFormData = {
  title: string;
  description: string;
  technologies: string[];
};

const INITIAL_FORM_DATA: ProjectFormData = {
  title: '',
  description: '',
  technologies: [],
};

export default function AddProjectForm({ modalOpen, onClose, onCreated }: AddProjectFormProps) {
  const [projectData, setProjectData] = useState<ProjectFormData>(INITIAL_FORM_DATA);
  const [techInput, setTechInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const addTechnology = () => {
    const value = techInput.trim();
    if (!value) return;

    const alreadyAdded = projectData.technologies.some(
      (tech) => tech.toLowerCase() === value.toLowerCase()
    );
    if (alreadyAdded) {
      setTechInput('');
      return;
    }

    setProjectData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, value],
    }));
    setTechInput('');
  };

  const removeTechnology = (tech: string) => {
    setProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleTechKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enter or comma commits the current chip instead of submitting/typing a comma
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTechnology();
    } else if (e.key === 'Backspace' && techInput === '' && projectData.technologies.length > 0) {
      // quick-remove the last chip when backspacing on an empty input
      removeTechnology(projectData.technologies[projectData.technologies.length - 1]);
    }
  };

  const resetForm = () => {
    setProjectData(INITIAL_FORM_DATA);
    setTechInput('');
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!projectData.title.trim()) {
      setError('Project name is required.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: projectData.title.trim(),
          description: projectData.description.trim(),
          technologies: projectData.technologies,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Failed to create project.');
      }

      const created = await res.json();
      onCreated?.(created);
      resetForm();
      onClose?.();
      toast.success('Your project has been created');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!modalOpen) return null;

  return (
    <Modal isOpen={modalOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="title">Project name</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter project name"
            value={projectData.title}
            onChange={handleInputChange}
            disabled={isLoading}
            className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter project description"
            value={projectData.description}
            onChange={handleInputChange}
            disabled={isLoading}
            className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="technologies">Technologies</label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            placeholder="Type a technology and press Enter"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleTechKeyDown}
            disabled={isLoading}
            className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          />

          {projectData.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {projectData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1 rounded-full bg-primary/10 pl-3 pr-1.5 py-1 text-sm font-medium text-primary"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    disabled={isLoading}
                    aria-label={`Remove ${tech}`}
                    className="rounded-full p-0.5 hover:bg-primary/20 disabled:opacity-60"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-foreground border border-border cursor-pointer hover:bg-primary/5 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary cursor-pointer hover:bg-p-bg-hover disabled:opacity-60"
          >
            {isLoading ? 'Adding...' : 'Add Project'}
          </button>
        </div>
      </form>
    </Modal>
  );
}