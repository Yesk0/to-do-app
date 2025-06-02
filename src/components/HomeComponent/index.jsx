import plusMath from "../../assets/Plus Math.png";
import verticalDots from "../../assets/Vertical dots.svg";
import trash from "../../assets/Trash.svg";
import checkmark from "../../assets/Checkmark.svg";
import { useState, useEffect } from "react";

export default function Home() {
  const [showAdding, setShowAdding] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState("todo");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => task.status === activeTab);

  const handleAdd = () => {
    setShowAdding(!showAdding);
  };
  const handleMenu = (id) => {
    openMenuIndex === id ? setOpenMenuIndex(null) : setOpenMenuIndex(id);
  };
  const handleDelete = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    setOpenMenuIndex(null);
  };
  const handleMoveToTrash = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, status: "trash" } : t
    );
    setTasks(updated);
    setActiveTab("trash");
    setOpenMenuIndex(null);
  };
  const handleMoveToToDo = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, status: "todo" } : t
    );
    setTasks(updated);
    setActiveTab("todo");
    setOpenMenuIndex(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskText.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskText, status: "todo" }]);
      setTaskText("");
    }
  };
  const handleCheck = (id) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, status: task.status === "done" ? "todo" : "done" }
        : task
    );
    setTasks(updated);
  };

  return (
    <>
      <main className="main pt-[100px] pb-[246px] px-[80px]">
        <div className="title flex flex-col gap-[24px]">
          <h1 className="heading inter-bold text-[34px] leading-[38px]">
            Simple To Do List
          </h1>
          <p className="description inter-normal text-[16px] leading-[22px]">
            Today is awesome day. The weather is awesome, you are awesome too!
          </p>
        </div>
        <div className="task-contols flex justify-between mt-[90px] relative z-0">
          <div className="pager flex gap-[16px] items-end">
            <button
              className="btn inter-bold text-[14px] leading-[18px] py-[11px] px-[24px] rounded-full bg-[#081E346B] h-auto text-[white] hover:cursor-pointer"
              onClick={() => setActiveTab("todo")}
              style={{
                backgroundColor:
                  activeTab === "todo" ? "#081E346B" : "#081E340D",
                color: activeTab === "todo" ? "white" : "black",
              }}
            >
              <span>To Do</span>
            </button>
            <button
              className="btn inter-bold text-[14px] leading-[18px] py-[11px] px-[24px] rounded-full h-auto bg-[#081E340D] hover:cursor-pointer"
              onClick={() => setActiveTab("done")}
              style={{
                backgroundColor:
                  activeTab === "done" ? "#081E346B" : "#081E340D",
                color: activeTab === "done" ? "white" : "black",
              }}
            >
              <span>Done</span>
            </button>
            <button
              className="btn inter-bold text-[14px] leading-[18px] py-[11px] px-[24px] rounded-full h-auto bg-[#081E340D] hover:cursor-pointer"
              onClick={() => setActiveTab("trash")}
              style={{
                backgroundColor:
                  activeTab === "trash" ? "#081E346B" : "#081E340D",
                color: activeTab === "trash" ? "white" : "black",
              }}
            >
              Trash
            </button>
          </div>
          {showAdding && (
            <div className="menu bg-[#E4E6E7] flex flex-col gap-[10px] p-[16px] w-[268px] rounded-[10px] absolute right-[77px] bottom-[0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.16)]">
              <h1 className="heading inter-bold text-[16px] leading-[22px]">
                Add New To Do
              </h1>
              <form
                onSubmit={handleSubmit}
                className="form flex flex-col gap-[10px]"
              >
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
          )}
          <button
            onClick={handleAdd}
            className="btn-pls rounded-full w-[52px] h-[52px] flex justify-center items-center bg-[#081E34] hover:cursor-pointer"
          >
            <img src={plusMath} alt="Plus Math" />
          </button>
        </div>
        <div className="sectionName mt-[64px] flex flex-col gap-[24px]">
          <h1 className="heading inter-bold text-[24px] leading-[28px]">
            To Do
          </h1>
          <div className="divider border border-[#D3D3D3]"></div>
        </div>
        <div className="itemList -ml-[24px] flex flex-col mt-[24px] gap-[16px]">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="item flex items-center gap-[8px] relative w-[654px]"
              style={{
                backgroundColor:
                  openMenuIndex === task.id ? "#E4E6E7" : "transparent",
              }}
            >
              <div className="icons flex items-center">
                <button
                  onClick={() => handleMenu(task.id)}
                  className="btn-dot flex items-center justify-center w-[24px] h-[24px] hover:cursor-pointer"
                >
                  <img src={verticalDots} alt="Vertical dots" />
                </button>
                <div className="icon flex items-center justify-center w-[24px] h-[24px]">
                  <input
                    className="checkbox inter-normal text-[16px] leading-[22px] border-[1.6px] rounded-[4px] bg-[#F1F1F1] border-[#AEAEAE] hover:cursor-pointer"
                    type="checkbox"
                    checked={task.status === "done"}
                    onChange={() => handleCheck(task.id)}
                    style={{
                      backgroundColor:
                        task.status === "done" ? "#712FFF" : "#F1F1F1",
                    }}
                  />
                </div>
              </div>
              <p
                className="list"
                style={{
                  textDecoration:
                    task.status === "done" ? "line-through" : "none",
                }}
              >
                {task.text}
              </p>
              {openMenuIndex === task.id && (
                <>
                  {activeTab !== "trash" ? (
                    <div className="menu bg-[#E4E6E7] py-[12px] pl-[4px] w-[240px] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.16)] absolute top-[30px] z-10">
                      <button
                        className="moveTrash flex gap-[10px] hover:cursor-pointer"
                        onClick={() => handleMoveToTrash(task.id)}
                      >
                        <div className="icon__trash flex items-center justify-center w-[24px] h-[24px]">
                          <img src={trash} alt="Trash" />
                        </div>
                        <p className="text__trash inter-normal text-[14px] leading-[18px] flex items-center">
                          Move to Trash
                        </p>
                      </button>
                    </div>
                  ) : (
                    <div className="menu bg-[#E4E6E7] py-[12px] pl-[4px] w-[240px] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.16)] absolute top-[30px] z-10">
                      <div className="menu__items flex flex-col gap-[10px]">
                        <button
                          className="delete flex gap-[10px] hover:cursor-pointer"
                          onClick={() => handleDelete(task.id)}
                        >
                          <div className="icon__delete flex items-center justify-center w-[24px] h-[24px]">
                            <img src={trash} alt="Trash" />
                          </div>
                          <p className="text__trash inter-normal text-[14px] leading-[18px] flex items-center">
                            Delete Forever
                          </p>
                        </button>
                        <button
                          className="moveToDo flex gap-[10px] hover:cursor-pointer"
                          onClick={() => handleMoveToToDo(task.id)}
                        >
                          <div className="icon__checkmark flex items-center justify-center w-[24px] h-[24px]">
                            <img src={checkmark} alt="Checkmark" />
                          </div>
                          <p className="text__checkmark inter-normal text-[14px] leading-[18px] flex items-center">
                            Move Back To To Do
                          </p>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </main>
      <footer className="footer px-[80px] py-[32px] flex justify-between">
        <div className="frame-22">
          <div className="author">
            <p className="author-text inter-normal text-[14px] leading-[18px]">
              Made with 🖤 at nFactorial in 2022.
            </p>
          </div>
        </div>
        <div className="resource">
          <p className="resource-text inter-normal text-[14px] leading-[18px] text-[#6c7a89]">
            Credits: icons from{" "}
            <a className="underline" href="https://icons8.com/">
              Icons8
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
