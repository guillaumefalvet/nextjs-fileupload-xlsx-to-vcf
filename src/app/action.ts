"use server";
import xlsToContact from "@/app/lib/xlsxToContact";

class NoFileError extends Error {
  constructor() {
    super("No file uploaded");
  }
}

class WrongFileTypeError extends Error {
  constructor() {
    super("Wrong file type");
  }
}
export default async function formAction(
  data: FormData
): Promise<string | unknown> {
  try {
    const file: File = data.get("file") as File;

    if (!file) {
      throw new NoFileError();
    }
    // Define allowed file types
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedTypes.includes(file?.type)) {
      throw new WrongFileTypeError();
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const processedData = xlsToContact(buffer);
    return processedData;
  } catch (error) {
    return error;
  }
}
