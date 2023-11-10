import xlsToContact from "@lib/xlsxToContact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  // Define allowed file types
  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  // Return JSON response if file type is not allowed
  if (!allowedTypes.includes(file?.type)) {
    return NextResponse.json({ success: false });
  }

  // Read file data, convert, and return JSON response
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const result = xlsToContact(buffer);

  return NextResponse.json({ success: true, data: result });
}
