import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { useRef, useState } from "react";
import { serverUrl } from "../../secret";

const Upload = ({ setImg }) => {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/upload`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }
      const data = await response.json();

      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  /**
   * Handles the file upload process.
   *
   * This function:
   * - Validates file selection.
   * - Retrieves upload authentication credentials.
   * - Initiates the file upload via the ImageKit SDK.
   * - Updates the upload progress.
   * - Catches and processes errors accordingly.
   */
  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },

        abortSignal: abortController.signal,
      });
      console.log("Upload response:", uploadResponse);
      setImg((prev) => ({ ...prev, dbData: uploadResponse }));
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };
  return (
    <div className="flex items-center">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        id="file-upload"
        onChange={handleUpload}
      />

      {/* Upload Button */}
      <label
        htmlFor="file-upload"
        className="cursor-pointer p-2 rounded-xl hover:bg-white/10 transition flex items-center justify-center"
      >
        <img src="/attachment.png" alt="Attach" className="w-5 h-5" />
      </label>

      {/* Optional Progress Bar */}
      {progress > 0 && (
        <progress
          value={progress}
          max={100}
          className="ml-2 h-1 w-20 overflow-hidden rounded bg-white/20"
        />
      )}
    </div>
  );
};

export default Upload;
