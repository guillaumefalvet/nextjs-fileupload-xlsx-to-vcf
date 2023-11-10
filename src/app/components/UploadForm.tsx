"use client";
import { useState } from "react";
import DownloadButton from "@components/DownloadButton";

export default function UploadForm() {
  // State variables for managing form data and conversion status
  const [file, setFile] = useState<File>();
  const [isConverted, setIsConverted] = useState<boolean>(false);
  const [convertedData, setConvertedData] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    // Define allowed file types
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    // Check if the selected file type is allowed
    if (!allowedTypes.includes(file?.type)) {
      setIsError(true);
      setErrorMsg("Wrong file type, only .xlsx allowed");
      return;
    }

    try {
      const data = new FormData();
      data.set("file", file);

      // Send a POST request to the server for file conversion
      const response: Response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      // Handle the error
      if (!response.ok) {
        setErrorMsg(`Error, cannot upload`);
        throw new Error(await response.text());
      } else {
        // Parse the JSON response and update state
        const { data } = await response.json();
        setIsConverted(true);
        setConvertedData(data);
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e);
    }
  };
  return (
    <div className="container mx-auto p-4">
      {isError && (
        <h1 className="text-center text-red-700 font-bold text-2xl">
          {errorMsg}
        </h1>
      )}
      {!isConverted && (
        <form onSubmit={onSubmit} className="mb-4 flex flex-col">
          <div className="mb-3">
            <label
              htmlFor="formFileLg"
              className="mb-2 inline-block text-neutral-700"
            ></label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              id="formFileLg"
              type="file"
              name="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </div>
          <button
            type="submit"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-auto"
          >
            Convert
          </button>
        </form>
      )}
      {isConverted && <DownloadButton data={convertedData} />}
    </div>
  );
}
