import { Image, ImageKitProvider } from "@imagekit/react";
import { useState } from "react";
import Upload from "./Upload";

const InputBox = () => {
  const [img, setImg] = useState({ dbData: {} });
  console.log(img, "inputbox");
  return (
    <div>
      {img.dbData?.filePath && (
        <ImageKitProvider urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}>
          <Image
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            src={img.dbData?.filePath}
            width={500}
            height={500}
            alt="Picture of the author"
            transformation={[{ width: 500, height: 500 }]}
          />
        </ImageKitProvider>
      )}

      <form className="flex items-center gap-3 w-full bg-white/10 p-3 rounded-2xl shadow-md">
        {/* Upload */}
        <Upload setImg={setImg} />

        {/* Text Input */}
        <input
          type="text"
          placeholder="Ask Nazim AI anything..."
          className="flex-1 rounded-2xl bg-transparent px-4 py-3 text-sm text-white
          placeholder:text-white/50 outline-none focus:ring-0"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="flex items-center justify-center rounded-2xl bg-purple-600
               px-4 py-3 text-sm font-medium text-white hover:bg-purple-500 transition"
        >
          <img src="/arrow.png" alt="Send" className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default InputBox;
