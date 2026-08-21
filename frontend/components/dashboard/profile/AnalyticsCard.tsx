import { GetInitials } from "@/utils"

export default function AnalyticsCard() {
  return (
    <section className="bg-background-card rounded-lg border border-border shadow-md p-4">
      <div className='border-b border-border flex items-center gap-4 p-2'>
        <div className="flex items-center justify-center bg-primary/20 text-6xl font-bold text-primary w-24 h-24 rounded-full">
          {GetInitials('Ibrahim')}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Ibrahim</h1>
            <p className="text-base text-muted-foreground">Ibrahim20@gmail.com</p>
          </div>

          <div>
            <p className="text-muted-foreground text-base">Joined on Aug, 20, 2026</p>
          </div>
        </div>
      </div>

      <div>
        {
          
        }
      </div>
    </section>
  )
}