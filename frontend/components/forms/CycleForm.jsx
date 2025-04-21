"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

///////
// Helper function
///////

function CalendarSelector({ formData, setFormData, field, min = 1, max = 28 }) {
  const selectedDay = parseInt(formData[field], 10);

  return (
    <div className="grid grid-cols-7 gap-1 mt-1">
      {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
        const isDisabled =
          !formData.start_date || day < min || day > max;

        return (
          <button
            key={day}
            type="button"
            disabled={isDisabled}
            className={`p-2 rounded text-center border w-full
              ${selectedDay === day ? "bg-search-text text-search-bg" : "bg-search-bg text-search-text"}
              ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-chiti-bg"}`}
						onClick={() => {
						  if (isDisabled) return;

						  setFormData((prev) => {
						    const updated = {
						      ...prev,
						      [field]: day.toString(),
						    };
						    if (
						      field === "payment_deadline" &&
						      parseInt(prev.payout_date, 10) <= day
						    ) {
						      updated.payout_date = "";
						    }

						    return updated;
						  });
						}}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}

function DateManager(setFormData) {
	const today = new Date();
	const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
	const minDate = nextMonth.toISOString().split("T")[0];
	const endOfMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
	const endOfMonthDate = endOfMonth.toISOString().split("T")[0];
	const onChangeMonth = (e) => {
		const { name, value } = e.target;
		const firstOfMonth = `${value}-01`;
		setFormData((prev) => ({
			...prev,
			[name]: firstOfMonth,
		}));
	};
	return { minDate, endOfMonthDate, onChangeMonth };
}

///////
// Main function
///////

export default function  CycleForm({ onSubmit })  {
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
			start_date: "",
			payment_deadline: "",
			payout_date: "",
	});
	const { minDate, endOfMonthDate, onChangeMonth } = DateManager(setFormData);

	const handleChange = (e) => {
	  const { name, value } = e.target;
	  setFormData((prev) => ({
	    ...prev,
	    [name]: value,
	  }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		// Convert string to int
		const payment_deadline = parseInt(formData.payment_deadline, 10);
		const payout_date = parseInt(formData.payout_date, 10);

		// Validate 1–28 range
		if (
			isNaN(payment_deadline) || payment_deadline < 1 || payment_deadline > 28 ||
			isNaN(payout_date) || payout_date < 1 || payout_date > 28
		) {
			setError("Dates must be numbers between 1 and 28.");
			return;
		}

		const payload = {
			start_date: formData.start_date,
			payment_deadline,
			payout_date,
		};
		return onSubmit(payload);
	};

	const label_style = "block text-sm text-search-text font-semibold mt-2";
	const input_style = "w-full p-2 bg-search-bg text-search-text mt-1 border border-gray-300 rounded-md";

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="start_date" className={label_style}>
						Start Month
					</label>
					<input
						type="month"
						id="start_date"
						name="start_date"
						value={formData.start_date?.slice(0, 7) || ""}
						onChange={onChangeMonth}
						className={input_style}
						required
						min={minDate.slice(0, 7)}
					/>
				</div>

				<div>
				  <label htmlFor="payment_deadline" className={label_style}>Payment Deadline</label>
				  <CalendarSelector 
				  	formData={formData} 
				  	setFormData={setFormData} 
				  	field="payment_deadline" 
						min={1}
						max={27}
				  />
				</div>

				<div>
				  <label htmlFor="payout_date" className={label_style}>Payout Date</label>
				  <CalendarSelector
				    formData={formData}
				    setFormData={setFormData}
				    field="payout_date"
				    min={formData.payment_deadline ? parseInt(formData.payment_deadline, 10) + 1 : 1}
				  />
				</div>
				<div className="flex justify-center mt-9">
					<Button
						text="Set Cycle"
						onClick={handleSubmit}
						type="submit"
					/>
				</div>
			</form>
		</div>
	);
}