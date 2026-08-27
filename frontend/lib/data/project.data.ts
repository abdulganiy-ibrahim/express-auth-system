import { cookies } from "next/headers";
import { Project } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProjects = async (): Promise<Project[]> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const res = await fetch(`${apiUrl}/api/projects`, {
      headers: {
        cookie: `accessToken=${accessToken}`
      }
    });

    if (!res.ok) {
      const message = await res.text().catch(() => null);
      throw new Error(message || `Failed to fetch projects (status: ${res.status})`);
    }

    const projects = await res.json();
    return projects;
  } catch (error) {
    console.error(`Error fetching projects`, error);
    throw error;
  }
}