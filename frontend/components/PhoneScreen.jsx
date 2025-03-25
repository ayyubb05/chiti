import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function PhoneScreen({ children }) {
  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-gray-200">

      {/* Outer Phone Frame */}
      <div className="relative w-[320px] h-[600px] bg-white border-4 border-gray-800 
                      rounded-[40px] shadow-lg flex flex-col items-center justify-center">

        {/* Inner Screen Outline (This will house the scrollable content) */}
        <div className="flex flex-col w-[96%] h-[98%] border-2 border-gray-600 rounded-[30px] overflow-hidden">
          
          {/* Header */}
          <div className="flex-shrink-0">
            <Header/>
          </div>

          {/* Body */}
          <div className="flex-grow overflow-auto">
            {children}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0">
            <Navbar/>
          </div>

        </div>

        {/* Pill-shaped Element */}
        <div className="absolute top-[3%] w-[120px] h-[23px] bg-gray-800 rounded-full"></div>

      </div>
    </div>
  );
}
function PhoneScreen_OG({ children }) {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-200">

      {/* Outer Phone Frame */}
      <div className="relative w-[320px] h-[600px] bg-white border-4 border-gray-800 rounded-[40px] shadow-lg flex items-center justify-center">

        {/* Inner Screen Outline (This will house the scrollable content) */}
        <div className="absolute w-[290px] h-[570px] border-2 border-gray-600 rounded-[30px] overflow-hidden">

          {/* Scrollable Content Window */}
          <div className="absolute top-[0%] w-full h-[32px] bg-green-600">
            <p className="pl-5 pt-2 text-white">09:27 </p>
          </div>

          <div className="h-full">
            {children}
          </div>

        </div>

        {/* Pill-shaped Element */}
        <div className="absolute top-[4%] w-[120px] h-[23px] bg-gray-500 rounded-full"></div>

      </div>
    </div>  );
}

function PhoneScreen_New({ children }) {
  return (
  <div className="relative w-full min-h-screen flex justify-center items-center bg-gray-200">
    {/* Outer Phone Frame */}
    <div className="relative w-[320px] bg-white border-4 border-gray-800 rounded-[40px] shadow-lg flex flex-col w-full">
      {/* Inner Screen Outline */}
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <div className="flex-shrink-0 bg-gray-300 p-4">
          <h1>Header Content</h1>
        </div>
        {/* Body */}
        <div className="flex-grow bg-gray-100 p-4 overflow-auto">
          <h2>Body Content</h2>
        </div>
        {/* Footer */}
        <div className="flex-shrink-0 bg-gray-300 p-4">
          <p>Footer Content</p>
        </div>
      </div>
    </div>
  </div>
  );
}
