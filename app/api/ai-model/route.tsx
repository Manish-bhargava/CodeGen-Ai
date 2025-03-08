import { NextResponse, NextRequest } from 'next/server';
import Constants from '@/data/Constants';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { module, description, imageUrl } = await request.json();

    // Validate the request body
    if (!description || !imageUrl) {
      return NextResponse.json(
        { error: 'Description and Image URL are required' },
        { status: 400 },
      );
    }

    // Find the model name from Constants
    const ModelObj = Constants.AiModelList.find((item) => item.name === module);
    const modelName = ModelObj?.modelName ?? 'google/gemini-2.0-pro-exp-02-05:free';

    // Fetch response from OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // Use environment variable for API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: description,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      }),
    });

    // Handle OpenRouter API response
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch response from OpenRouter API' },
        { status: response.status },
      );
    }

    // Create a ReadableStream to stream the response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            break;
          }
          const text = decoder.decode(value);
          controller.enqueue(new TextEncoder().encode(text));
        }
      },
    });

    // Return the streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}