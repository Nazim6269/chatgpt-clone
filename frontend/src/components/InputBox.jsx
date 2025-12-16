import Upload from "./Upload";

const InputBox = () => {
  return (
    <>
      <form className="flex items-center gap-3 w-full bg-white/10 p-3 rounded-2xl shadow-md">
        {/* File Attachment */}
        {/* <label
          htmlFor="file"
          className="cursor-pointer p-2 rounded-lg hover:bg-white/10 transition"
        >
          <img src="/attachment.png" alt="Attach" className="w-6 h-6" />
        </label> */}

        <Upload />
        {/* <input id="file" type="file" multiple={false} className="hidden" /> */}

        {/* Text Input */}
        <input
          type="text"
          placeholder="Ask Nazim AI anything..."
          className="flex-1 rounded-2xl bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50
                   outline-none  focus:ring-0 transition"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="flex items-center justify-center rounded-2xl bg-purple-600 px-4 py-3 text-sm font-medium text-white
                   hover:bg-purple-500 transition"
        >
          <img src="/arrow.png" alt="Send" className="w-4 h-4" />
        </button>
      </form>
    </>
  );
};

export default InputBox;
