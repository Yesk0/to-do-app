import trash from "../../assets/Trash.svg";

export default function FilterByTrash({ handleMoveToTrash, taskId }) {
  return (
    <div className="menu__trash bg-[#E4E6E7] py-[12px] pl-[4px] w-[240px] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.16)] absolute bottom-[192px] z-10">
      <button
        className="btn flex gap-[10px] hover:cursor-pointer"
        onClick={() => handleMoveToTrash(taskId)}
      >
        <div className="icon flex items-center justify-center w-[24px] h-[24px]">
          <img src={trash} alt="Trash" />
        </div>
        <p className="text inter-normal text-[14px] leading-[18px] flex items-center">
          Move to Trash
        </p>
      </button>
    </div>
  );
}
