"use client";

export default function UploadPage() {
  async function upload() {
    alert("Upload placeholder");
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Upload Model</h2>
      <button onClick={upload} className="px-4 py-2 bg-white text-black">
        Upload
      </button>
    </div>
  );
}
