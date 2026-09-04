'use client';

import Link from "next/link";
import { SiGithub } from 'react-icons/si'
import { terminalLines, features } from "@/lib/data/landingPage.data";


const githubUrl = "https://github.com/abdulganiy-ibrahim/express-auth-system";


function statusColor(status: number) {
  if (status >= 200 && status < 300) return "text-emerald-400";
  if (status === 429) return "text-amber-400";
  return "text-red-400";
}

export default function LandingPage() {
  return (
    <>
      <div className="max-w-6xl w-full mx-auto px-6 py-16 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: pitch */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            An authentication backend,
            <span className="text-primary"> built the way it should be.</span>
          </h1>

          <p className="mt-5 text-base text-muted-foreground max-w-md leading-relaxed">
            Signup, email verification, secure login, password changes, role-based
            authorization, rate limiting, and refresh token rotation. Implemented
            from scratch, not bolted on with a third-party auth provider.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-p-bg-hover transition-all duration-300"
            >
              Test it now
            </Link>

            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-300"
            >
              <SiGithub size={18} />
              View source
            </Link>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-3">
                <Icon size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: terminal mockup */}
        <div className="rounded-2xl bg-[#0B0F17] border border-border/40 shadow-xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-3 text-xs text-white/40 font-mono">auth-flow.http</span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-7 overflow-x-auto">
            {terminalLines.map((line, i) => (
              <div key={i} className="whitespace-nowrap">
                <span className="text-white/40">$ </span>
                <span className="text-sky-400">{line.method}</span>{' '}
                <span className="text-white/80">{line.path}</span>{' '}
                <span className={statusColor(line.status)}>{line.status}</span>
                <span className="text-white/30"> — {line.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}