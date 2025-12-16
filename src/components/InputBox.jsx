const InputBox = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Ask Nazim AI anything..."
        className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm outline-none
                         focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        className="rounded-xl bg-purple-600 px-4 py-3 text-sm font-medium
                         hover:bg-purple-500 transition"
      >
        Send
      </button>
    </form>
  );
};

export default InputBox;
