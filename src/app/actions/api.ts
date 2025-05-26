"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function fetchProtectedData() {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  // Make your API call here
  // The session.accessToken is your Keycloak token
  const response = await fetch(`${process.env.API_BASE_URL}/data`, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}

export async function fetchPrescriptions() {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${process.env.API_BASE_URL}/prescriptions`, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch prescriptions');
  }

  return response.json();
}