
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import { GoogleBusinessProfileAPI, getGoogleAccessToken } from '@/lib/google-business-profile'
import { getPrisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(getAuthOptions())
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const accessToken = await getGoogleAccessToken(session.user.id)
    if (!accessToken) {
      return NextResponse.json({ error: 'Google access token not found' }, { status: 401 })
    }

    const api = new GoogleBusinessProfileAPI(accessToken)
    
    // Get business accounts
    const accountsResponse = await api.getBusinessAccounts()
    const accounts = accountsResponse.accounts || []

    const businesses = []

    // For each account, get locations
    for (const account of accounts) {
      try {
        const locationsResponse = await api.getBusinessLocations(account.name)
        const locations = locationsResponse.locations || []

        for (const location of locations) {
          // Extract location data
          const businessData = {
            googleId: location.name,
            name: location.title || location.name,
            address: location.storefrontAddress ? 
              `${location.storefrontAddress.addressLines?.join(', ')}, ${location.storefrontAddress.locality}, ${location.storefrontAddress.administrativeArea} ${location.storefrontAddress.postalCode}` : 
              '',
            phoneNumber: location.primaryPhone || null,
            websiteUrl: location.websiteUrl || null,
            category: location.primaryCategory?.displayName || null,
            isVerified: location.metadata?.mapsUrl ? true : false,
          }

          // Save or update business in database
          const business = await getPrisma().business.upsert({
            where: { googleId: businessData.googleId },
            update: businessData,
            create: {
              ...businessData,
              userId: session.user.id,
            },
          })

          businesses.push(business)
        }
      } catch (error) {
        console.error(`Error fetching locations for account ${account.name}:`, error)
      }
    }

    return NextResponse.json({ businesses })
  } catch (error) {
    console.error('Error fetching businesses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch businesses' },
      { status: 500 }
    )
  }
}
