import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PublicUser } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUserById(userId: string): Promise<PublicUser> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const res = await fetch(`${apiUrl}/api/user/${userId}`, {
      headers: {
        cookie: `accessToken=${accessToken}`
      }
    });

    if (res.status === 401) {
      redirect('/signin'); 
    }

    if (!res.ok) {
      const message = await res.text().catch(() => null);
      throw new Error(message || `Failed to fetch user data (status: ${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user ${userId}`, error);
    throw error;
  }
}