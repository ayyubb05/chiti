
export default function TitleCard() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Logo Image */}
      <div className="relative flex justify-center items-center mb-4">
        {/* Background Circle */}
        <div className="absolute w-[170px] h-[170px] bg-green-600 rounded-full"></div>
        <div className="absolute w-[140px] h-[140px] bg-white rounded-full"></div>

        {/* Profile Image */}
        <img 
          src="/cleanwater-logo.svg" // replace with the actual path to your image
          alt="CHITI Logo"
          width={150} // adjust the width as needed
          height={150} // adjust the height as needed
          className="relative rounded-full"
        />
      </div>      
      {/* Title */}
      <h1 className="text-3xl font-bold text-green-700">CleanWater™</h1>
    </div>
  );
}