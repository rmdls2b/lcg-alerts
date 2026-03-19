import { NextResponse } from "next/server"

export function middleware(request) {
  const key = request.nextUrl.searchParams.get("key")
  if (key !== process.env.DASHBOARD_PATH) {
    return new NextResponse("Not found", { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/:path*"
}
