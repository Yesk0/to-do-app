import trash from "../../assets/trash.svg";

export default function DeleteForever({ onDelete, taskId }) {
  return (
    <button
      className="btn flex gap-[10px] hover:cursor-pointer"
      onClick={() => onDelete(taskId)}
    >
      <div className="icon flex items-center justify-center w-[24px] h-[24px]">
        <img src={trash} alt="Trash" />
      </div>
      <p className="text inter-normal text-[14px] leading-[18px] flex items-center">
        Delete Forever
      </p>
    </button>
  );
}
