import type { CreateProjectData } from "../types/project.types.js"

export const validateProjectData = (projectData: CreateProjectData) => {
  const { userId, title, description, technologies} = projectData;

  if ( !userId || !title || !description || !technologies) {
    throw new Error('All fields are required');
  }

  if (
  typeof userId !== "string" &&
  typeof title !== "string" &&
  typeof description !== "string" &&
  !Array.isArray(technologies)
) {
  throw new Error("Invalid project data");
}

return {
  ...projectData
}
}