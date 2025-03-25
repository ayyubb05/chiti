
export default function TitleCard() {
  return (
    <div className="flex flex-col items-center justify-center mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Logo Image */}
      <div className="mb-4">
        <img 
          src="/cleanwater-logo.svg" // replace with the actual path to your image
          alt="CHITI Logo"
          width={150} // adjust the width as needed
          height={150} // adjust the height as needed
        />
      </div>
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-green-700">CleanWater™</h1>
    </div>
  );
}