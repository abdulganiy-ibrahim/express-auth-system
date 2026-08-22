import type { CreateProjectData } from "../types/user.types.js"

export const validateProjectData = (projectData: CreateProjectData) => {
  const { userId, title, description, technologies} = projectData;

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