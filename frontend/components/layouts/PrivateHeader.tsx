import MobileSidebar from "./MobileSidebar"

type PrivateHeaderProps = {
  userId: string;
}

export default function PrivateHeader({userId}: PrivateHeaderProps) {
  return (
    <>
      {/* Mobile header*/}
      <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
        <div>
          <h1 className="text-xl text-primary md:text-2xl font-bold">Welcome!</h1>
        </div>

        <div>
          <MobileSidebar userId={userId}/>
        </div>
      </div>

      {/*Desktop header */}
      <div className="hidden lg:block bg-primary text-white py-4 px-6">
        <h1 className="text-xl md:text-2xl font-bold">Welcome!</h1>
        <p>you can edit your profile here</p>
      </div>
    </>
    
  )
}