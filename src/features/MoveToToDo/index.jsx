import checkmark from "../../assets/checkmark.svg";

export default function MoveToToDo({ onRestore, taskId }) {
  return (
    <button
      className="btn flex gap-[10px] hover:cursor-pointer"
      onClick={() => onRestore(taskId)}
    >
      <div className="icon flex items-center justify-center w-[24px] h-[24px]">
        <img src={checkmark} alt="Checkmark" />
      </div>
      <p className="text inter-normal text-[14px] leading-[18px] flex items-center">
        Move Back To To Do
      </p>
    </button>
  );
}
