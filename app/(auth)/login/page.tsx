import { Suspense } from "react"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Login - SaaSistent",
  description: "Sign in to your SaaSistent account",
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
