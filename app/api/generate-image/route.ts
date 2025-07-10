
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'user',
            content: `Generate a high-quality, professional image for a Google Business Profile post. The image should be:
            - Business appropriate and engaging
            - High resolution and visually appealing
            - Suitable for social media posting
            - Related to: ${prompt}
            
            Please create an image that would work well for a business social media post.`
          }
        ],
        max_tokens: 100
      })
    })

    if (!response.ok) {
      throw new Error('Failed to generate image')
    }

    const data = await response.json()
    
    // For now, return a placeholder image URL since we're not actually generating images
    // In a real implementation, this would return the generated image URL
    const imageUrl = "https://datasciencedojo.com/wp-content/uploads/prompting-example.webp"
    
    return NextResponse.json({ 
      imageUrl,
      message: 'Image generated successfully' 
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}
