export default function TabButton({ label, tabKey, activeTab, setActiveTab }) {
  const isActive = activeTab === tabKey;

  return (
    <button
      className="btn inter-bold text-[14px] leading-[18px] py-[11px] px-[24px] rounded-full h-auto hover:cursor-pointer"
      onClick={() => setActiveTab(tabKey)}
      style={{
        backgroundColor: isActive ? "#081E346B" : "#081E340D",
        color: isActive ? "white" : "black",
      }}
    >
      <span className="span">{label}</span>
    </button>
  );
}
