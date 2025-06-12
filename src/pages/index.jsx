import { useState, useEffect } from "react";
import AddWidget from "../widgets/AddWidget";
import TaskList from "../entities/TaskList";
import TabButton from "../shared/ui/TabButton";
import AddButton from "../shared/ui/AddButton";

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
  useEffect(() => {
    setOpenMenuIndex(null);
  }, [activeTab]);

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
      t.id === id ? { ...t, status: "trash", previousStatus: t.status } : t
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
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: taskText,
          status: "todo",
          previousStatus: "todo",
        },
      ]);
      setTaskText("");
    }
  };
  const handleCheck = (id) => {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        if (task.status === "trash") return task;
        return {
          ...task,
          status: task.status === "done" ? "todo" : "done",
        };
      }
      return task;
    });
    setTasks(updated);
  };

  return (
    <>
      <main className="main pt-[100px] pb-[246px] px-[80px] relative">
        <div className="title flex flex-col gap-[24px]">
          <h1 className="heading inter-bold text-[34px] leading-[38px]">
            Simple To Do List
          </h1>
          <p className="description inter-normal text-[16px] leading-[22px]">
            Today is awesome day. The weather is awesome, you are awesome too!
          </p>
        </div>
        <div className="task-contols flex justify-between mt-[90px] relative z-0">
          <div className="sections flex gap-[16px] items-end">
            <TabButton
              label="To Do"
              tabKey="todo"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabButton
              label="Done"
              tabKey="done"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabButton
              label="Trash"
              tabKey="trash"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          {showAdding && (
            <AddWidget
              taskText={taskText}
              setTaskText={setTaskText}
              handleSubmit={handleSubmit}
            />
          )}
          <AddButton handleAdd={handleAdd} />
        </div>
        <div className="section mt-[64px] flex flex-col gap-[24px]">
          <h1 className="heading inter-bold text-[24px] leading-[28px]">
            To Do
          </h1>
          <div className="divider border border-[#D3D3D3]"></div>
        </div>
        <TaskList
          filteredTasks={filteredTasks}
          activeTab={activeTab}
          openMenuIndex={openMenuIndex}
          handleMenu={handleMenu}
          handleCheck={handleCheck}
          handleMoveToTrash={handleMoveToTrash}
          handleDelete={handleDelete}
          handleMoveToToDo={handleMoveToToDo}
        />
      </main>
      <footer className="footer px-[80px] py-[32px] flex justify-between">
        <div className="frame-22">
          <div className="author">
            <p className="author__text inter-normal text-[14px] leading-[18px]">
              Made with 🖤 at nFactorial in 2022.
            </p>
          </div>
        </div>
        <div className="resource">
          <p className="resource__text inter-normal text-[14px] leading-[18px] text-[#6c7a89]">
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
