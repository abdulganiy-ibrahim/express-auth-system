interface AuthLogoNameProps {
  collapsed?: boolean;
}

export default function AuthLogoName({ collapsed = false }: AuthLogoNameProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 shrink-0 items-center justify-around rounded-lg bg-linear-to-br from-primary to-accent-500 text-xl font-bold text-white lg:text-2xl">
        AS
      </div>
      {!collapsed && (
        <h1 className="whitespace-nowrap text-xl font-bold text-foreground lg:text-2xl">
          Auth Showcase
        </h1>
      )}
    </div>
  );
}