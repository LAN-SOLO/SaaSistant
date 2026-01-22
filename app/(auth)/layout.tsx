import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple header with logo */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              S
            </div>
            <span className="text-xl font-bold">SaaSistent</span>
          </Link>
        </div>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Simple footer */}
      <footer className="border-t py-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SaaSistent. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
