import verticalDots from "../../../assets/Vertical dots.svg";

export default function VerticalDotsButton({ taskId, onMenuClick }) {
  return (
    <button
      onClick={() => onMenuClick(taskId)}
      className="btn-dot flex items-center justify-center w-[24px] h-[24px] hover:cursor-pointer"
    >
      <img src={verticalDots} alt="Vertical dots" />
    </button>
  );
}
