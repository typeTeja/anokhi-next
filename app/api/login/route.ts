import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const adminEmail = process.env.ADMIN_USER
    const adminPassword = process.env.ADMIN_PASSWORD

    if (email === adminEmail && password === adminPassword) {
      // Set a simple auth cookie
      const cookieStore = await cookies()
      cookieStore.set("auth_token", "anokhi_admin_session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
