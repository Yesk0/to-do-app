import React from "react";

export default function AddWidget({ taskText, setTaskText, handleSubmit }) {
  return (
    <div className="widget__add bg-[#E4E6E7] flex flex-col gap-[10px] p-[16px] w-[268px] rounded-[10px] absolute right-[77px] bottom-[0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.16)]">
      <h1 className="heading inter-bold text-[16px] leading-[22px]">
        Add New To Do
      </h1>
      <form onSubmit={handleSubmit} className="form flex flex-col gap-[10px]">
        <textarea
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="textarea w-[236px] h-[120px] rounded-[8px] inter-bold text-[16px] leading-[22px] placeholder:text-[#959595] align-top border-none resize-none"
          type="text"
          placeholder="Your text"
        />
        <button
          type="submit"
          className="btn inter-bold text-[14px] leading-[18px] rounded-full bg-[#081E34] text-[#FFFFFF] w-[76px] h-[40px] hover:cursor-pointer"
        >
          Add
        </button>
      </form>
    </div>
  );
}
