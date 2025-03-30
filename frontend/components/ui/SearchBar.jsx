export default function SearchBar() {
  return (
    <div className="w-full my-2 ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}