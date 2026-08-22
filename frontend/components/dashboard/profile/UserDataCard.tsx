import { getInitial, formatDate } from "@/utils"

type UserDataCardProps = {
  userData: {
    name: string;
    email: string;
    created_at: Date;
    last_login: Date;
  }
}

export default function UserDataCard({userData}: UserDataCardProps) {
  return (
    <div className='flex items-center gap-4 p-2'>
      <div className="flex items-center justify-center bg-primary/20 text-6xl font-bold text-primary w-24 h-24 rounded-full">
        {getInitial('Ibrahim')}
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">{userData.name}</h1>
          <p className="text-base text-muted-foreground">{userData.email}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-base">{formatDate(userData.created_at
          )}</p>
        </div>
      </div>
    </div>
  )
}