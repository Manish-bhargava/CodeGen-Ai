import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/db'; // Adjust the import path to your db configuration
import { wireframeToCodeTable } from '@/configs/schema'; // Adjust the import path to your schema
import { eq } from 'drizzle-orm';

// POST endpoint to save data
export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    console.log('Request Body:', requestBody); // Log the request body

    const { imageUrl, model, description, email, uid } = requestBody;

    // Validate the request body
    if (!imageUrl || !model || !description || !email || !uid) {
      console.error('Missing required fields'); // Log validation error
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Save the data to the database
    const result = await db
      .insert(wireframeToCodeTable)
      .values({
        uid, // User ID (foreign key)
        imageUrl,
        model,
        description,
        createdBy: email,
      })
      .returning({ id: wireframeToCodeTable.id });

    console.log('Database Save Result:', result); // Log the database save result

    // Return a success response
    return NextResponse.json(
      {
        message: 'Data received and saved successfully',
        data: { imageUrl, model, description, email, uid },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing request:', error); // Log the error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// GET endpoint to fetch data by UID
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const uid = searchParams.get('uid');
  const email = searchParams.get('email');

  // Check if UID is provided
  if (!uid) {
    return NextResponse.json({ error: 'UID is required' }, { status: 400 });
  } else if (email) {
    console.log("Fetching wireframes for email:", email); // Log the email
    const result = await db
      .select()
      .from(wireframeToCodeTable)
      .where(eq(wireframeToCodeTable.createdBy, email)); // Use `email` instead of `uid`
    console.log("Query result:", result); // Log the query result
    return NextResponse.json(result);
  }

  try {
    // Query the database
    const result = await db
      .select()
      .from(wireframeToCodeTable)
      .where(eq(wireframeToCodeTable.uid, uid));

    // Check if a record was found
    if (result.length > 0) {
      return NextResponse.json(result[0]);
    } else {
      return NextResponse.json({ error: 'No Record Found' }, { status: 404 });
    }
  } catch (error) {
    // Handle database errors
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
// export async function PUT(req:NextRequest){
//   const {uid,codeResp}=await req.json();
//   const result=await db.update(wireframeToCodeTable).set({
//     code:codeResp
//   }).where(eq(wireframeToCodeTable.uid,uid)).returning({uid:wireframeToCodeTable.uid})
//   return NextResponse.json(result);
// }
export async function PUT(req: NextRequest) {
  try {
    const { uid, code } = await req.json(); // Use `code` instead of `codeResp`
    console.log("uid is ", uid, code); // Log the received values

    // Validate the request body
    if (!uid || !code) {
      return NextResponse.json(
        { error: 'Missing required fields: uid or code' },
        { status: 400 },
      );
    }

    // Update the database
    const result = await db
      .update(wireframeToCodeTable)
      .set({ code }) // Use `code` instead of `codeResp`
      .where(eq(wireframeToCodeTable.uid, uid))
      .returning({ uid: wireframeToCodeTable.uid });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating code:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}