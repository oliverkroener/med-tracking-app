import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, token: string) => Promise<NextResponse>
) {
  // Check for authentication
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Return 401 if not authenticated
  if (!session?.accessToken) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    // Call the handler with the authenticated request
    return await handler(request, session.accessToken as string);
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(null, { status: 500 });
  }
}