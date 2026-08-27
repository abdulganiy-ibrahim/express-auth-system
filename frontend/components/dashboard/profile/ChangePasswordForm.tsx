'use client';
import { useState } from 'react';
import { toast } from 'sonner';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if(!apiUrl) {
      toast.error("Can't communicate with the server");
    }

    try {
      const res = await fetch(`${apiUrl}/api/auth/changePassword`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(password),
        credentials: 'include'
      });

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Failed to change password');
      }

      toast.success('Password changed successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ?
        error.message :
        'Failed to change password'
      );
    } finally {
      setIsLoading(false);
      setPassword({
        oldPassword: '',
        newPassword: '',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <section className="mt-6">
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="current" className="text-base text-muted-foreground">Current Password</label>
        <input 
          id="oldPassword"
          name="oldPassword"
          type="text"
          placeholder="Enter Current Password"
          value={password.oldPassword}
          onChange={handleInputChange}
          className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="newPassword" className="text-base text-muted-foreground">New Password</label>
        <input 
          id="newPassword"
          name="newPassword"
          type="text"
          placeholder="Enter New password"
          value={password.newPassword}
          onChange={handleInputChange}
          className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="confirm" className="text-base text-muted-foreground">Confirm New Password</label>
        <input 
          id="confirm"
          name="confirm"
          type="text"
          placeholder="Confirm new password"
          value={password.confirm}
          onChange={handleInputChange}
          className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div> */}

      <div className='mx-auto'>
        <button
          type="submit" 
          className="bg-primary text-white w-full py-2 rounded-full cursor-pointer hover:bg-p-bg-hover transition-all duration-300"
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </section>
    </form>
  )
}