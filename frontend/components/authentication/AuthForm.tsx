'use client'
import { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export default function Authform() {
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");

  const handleTabSwitch = (tab: "signup" | "login") => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="relative flex items-center w-full rounded-full bg-background-card border border-border p-1 mb-6">

        {/* Sliding pill — sits behind buttons */}
        <div
          className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-background-card shadow-md transition-transform duration-300 ${
            activeTab === "login" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
          }`}
        />

        {/* Buttons sit side by side, on top of the pill */}
        <button
          type="button"
          onClick={() => handleTabSwitch("signup")}
          className={`relative z-10 w-1/2 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 ${
            activeTab === "signup" ? "text-primary" : "text-text-secondary"
          }`}
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => handleTabSwitch("login")}
          className={`relative z-10 w-1/2 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 ${
            activeTab === "login" ? "text-primary" : "text-text-secondary"
          }`}
        >
          Log In
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "signup" ? <SignUpForm onSwitchToLogin={() => handleTabSwitch("login")} /> : <SignInForm />}
      </div>
    </div>
  )
}