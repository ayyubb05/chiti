// LoginForm.js
export default function LoginForm() {
  return (
    <div>
		<form className="space-y-2">
		<div>
		  <input
		    type="text"
		    id="username"
		    className="w-full p-2 bg-[#FFF5E1] mt-1 border border-gray-300 rounded-md text-green-700"
		    placeholder="Enter your username"
		  />
		</div>
		<div>
		  <input
		    type="password"
		    id="password"
		    className="w-full p-2 bg-[#FFF5E1] mt-1 border border-gray-300 rounded-md text-green-700"
		    placeholder="Enter your password"
		  />
		</div>
		<div>
		  <button
		    type="submit"
		    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
		  >
		    Login
		  </button>
		</div>
   		</form>
    </div>
  );
}