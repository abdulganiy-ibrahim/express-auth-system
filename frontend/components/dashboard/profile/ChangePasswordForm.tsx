'use client';
import { useState } from 'react';

export default function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form>
      <section className="mt-6">
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="current" className="text-base text-muted-foreground">Current Password</label>
        <input 
          id="current"
          name="current"
          type="current"
          placeholder="Enter Current Password"
          value={password.confirm}
          onChange={handleInputChange}
          className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="new" className="text-base text-muted-foreground">New Password</label>
        <input 
          id="new"
          name="new"
          type="new"
          placeholder="Enter New password"
          value={password.new}
          onChange={handleInputChange}
          className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="confirm" className="text-base text-muted-foreground">Confirm New Password</label>
        <input 
          id="confirm"
          name="confirm"
          type="confirm"
          placeholder="Confirm new password"
          value={password.confirm}
          onChange={handleInputChange}
          className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className='mx-auto'>
        <button
          type="submit" 
          className="bg-primary text-white w-full py-2 rounded-full hover:bg-p-bg-hover transition-all duration-300"
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </section>
    </form>
  )
}