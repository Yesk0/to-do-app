export default function CheckedButton({ task, onCheck }) {
  const isChecked =
    task.status === "done" ||
    (task.status === "trash" && task.previousStatus === "done");

  return (
    <div className="icon flex items-center justify-center w-[24px] h-[24px]">
      <input
        className="checkbox inter-normal text-[16px] leading-[22px] border-[1.6px] rounded-[4px] bg-[#F1F1F1] border-[#AEAEAE] hover:cursor-pointer"
        type="checkbox"
        checked={isChecked}
        onChange={() => onCheck(task.id)}
        style={{
          backgroundColor: isChecked ? "#712FFF" : "#F1F1F1",
        }}
      />
    </div>
  );
}
