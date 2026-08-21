export default function AuthLogoName() {
  return (
    <div className="flex items-center gap-2">
      <div 
        className="h-10 w-10 bg-linear-to-br from-primary to-accent-500 text-xl lg:text-2xl text-white font-bold flex justify-around items-center rounded-lg"
      >
        AS
      </div>
      <h1 className="text-xl lg:text-2xl font-bold text-foreground">Auth Showcase</h1>
    </div>
  )
}