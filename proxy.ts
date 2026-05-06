import { NextResponse, type NextRequest } from 'next/server'


export function proxy(request: NextRequest) {

  const authToken = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/dashboard')) {
    if (!authToken) {
      // If it's an API request, return 401
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      
      // Redirect to login if not authenticated for pages
      const url = new URL('/login', request.url)
      return NextResponse.redirect(url)
    }
  }


  // Redirect authenticated users away from login page
  if (pathname === '/login' && authToken) {
    const url = new URL('/dashboard', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/dashboard/:path*', '/login'],
}

