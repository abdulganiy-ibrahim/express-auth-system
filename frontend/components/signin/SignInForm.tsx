'use client';
import { useState } from 'react';
import { toast } from 'sonner';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/auth/signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Sign in Failed');
      }

      toast.success('Signed in successful');
    } catch (error) {
      toast.error(
        error instanceof Error ?
        error.message :
        'Sign in Failed'
      )
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl bgbackground-card border border-border rounded-xl py-4 px-6"
    >
      <section className='flex flex-col items-center'>
        <h1 className='text-2xl text-primary font-semibold'>Welcome Back!</h1>
        <p className='text-primary'>Sign In to continue</p>
      </section>

      <section className="mt-6">
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="email" className="text-base text-muted-foreground">Email</label>
          <input 
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="password" className="text-base text-muted-foreground">Password</label>
          <input 
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 border border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className='mx-auto'>
          <button
            type="submit" 
            className="bg-primary text-white w-full py-2 rounded-full hover:bg-p-bg-hover transition-all duration-300"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </section>
    </form>
  )
}