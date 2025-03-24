export default function PhoneScreen({ children }) {
  return (
	<div className="flex items-center justify-center min-h-screen bg-gray-200">
	  {/* Outer Phone Frame */}
	  <div className="relative w-[320px] h-[600px] bg-white border-4 border-gray-800 rounded-[40px] shadow-lg flex items-center justify-center">
	    {/* Inner Screen Outline */}
	    <div className="absolute w-[290px] h-[570px] border-2 border-gray-600 rounded-[30px]">
	      {children}
	    </div>
	    {/* Pill-shaped Element */}
	    <div className="absolute top-[4%] w-[120px] h-[23px] bg-gray-500 rounded-full"></div>
	  </div>
	</div>
  );
}