import FilterByTrash from "../../features/FilterByTrash";
import DeleteForever from "../../features/DeleteForever";
import MoveToToDo from "../../features/MoveToToDo";
import VerticalDotsButton from "../../shared/ui/VerticalDotsButton";
import CheckedButton from "../../shared/ui/CheckedButton";

export default function TaskList({
  filteredTasks,
  activeTab,
  openMenuIndex,
  handleMenu,
  handleCheck,
  handleMoveToTrash,
  handleDelete,
  handleMoveToToDo,
}) {
  return (
    <div className="itemList -ml-[24px] flex flex-col mt-[24px] gap-[16px]">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="item flex items-center gap-[8px] w-[50.154%]"
          style={{
            backgroundColor:
              openMenuIndex === task.id ? "#E4E6E7" : "transparent",
          }}
        >
          <div className="icons flex items-center">
            <VerticalDotsButton taskId={task.id} onMenuClick={handleMenu} />
            <CheckedButton task={task} onCheck={handleCheck} />
          </div>
          <p
            className="text break-all w-[100%]"
            style={{
              textDecoration:
                task.status === "done" ||
                (task.status === "trash" && task.previousStatus === "done")
                  ? "line-through"
                  : "none",
            }}
          >
            {task.text}
          </p>
          {openMenuIndex === task.id && (
            <>
              {activeTab !== "trash" ? (
                <FilterByTrash
                  handleMoveToTrash={handleMoveToTrash}
                  taskId={task.id}
                />
              ) : (
                <div className="menu__delete bg-[#E4E6E7] py-[12px] pl-[4px] w-[240px] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.16)] absolute bottom-[158px] z-10">
                  <div className="delete-items flex flex-col gap-[10px]">
                    <DeleteForever onDelete={handleDelete} taskId={task.id} />
                    <MoveToToDo onRestore={handleMoveToToDo} taskId={task.id} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
