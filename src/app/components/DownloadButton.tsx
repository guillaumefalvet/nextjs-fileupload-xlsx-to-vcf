// Import necessary modules
import React from "react";
import { saveAs } from "file-saver";
type downloadButtonProps = {
  data: string;
};

export default function DownloadButton({ data }: downloadButtonProps) {
  const handleDownload = () => {
    // Create a Blob from the data and trigger download
    const blob = new Blob([data], { type: "text/x-vcard;charset=utf-8" });
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + "-" + time;
    saveAs(blob, `${dateTime}_card.vcf`);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleDownload}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </button>
    </div>
  );
}
