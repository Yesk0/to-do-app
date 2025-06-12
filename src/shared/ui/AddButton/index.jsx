import plusMath from "../../../assets/Plus Math.png";

export default function AddButton({ handleAdd }) {
  return (
    <button
      onClick={handleAdd}
      className="btn-pls rounded-full w-[52px] h-[52px] flex justify-center items-center bg-[#081E34] hover:cursor-pointer"
    >
      <img src={plusMath} alt="Plus Math" />
    </button>
  );
}
