interface AuthLogoNameProps {
  collapsed?: boolean;
}

export default function AuthLogoName({ collapsed = false }: AuthLogoNameProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 shrink-0 items-center justify-around rounded-lg bg-primary text-xl font-bold text-white">
        AS
      </div>
      {!collapsed && (
        <h1 className="whitespace-nowrap text-xl font-bold text-foreground">
          Auth Showcase
        </h1>
      )}
    </div>
  );
}