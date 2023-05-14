
const API_URL = "http://localhost:3000";

type Task = {
  id: number;
  status: number;
  title: string;
}
enum TaskStatus {
  TODO = 0,
  DONE = 1,
}

export class Application {

  private tasks: Array<Task> = [];
  private elems_taskLists: HTMLElement | null = null;

  start = async (): Promise<void> =>
  {
    this.fetchData();
    this.elems_taskLists = document.querySelector(".task-list");

    return;
  };


  private fetchData = async (): Promise<void> => {
    // const options: object = {
    //   mode: 'no-cors', // no-cors, *cors, same-origin
    //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //   },
    // };

    const response = await fetch(`${API_URL}/api/tasks`);
    if (!response.ok) throw new Error("Network response was not ok.");

    this.tasks = await response.json() as Array<Task>;

    this.displayTasks();

  }
  private displayTasks = (): void => {

    if (this.elems_taskLists == null) return;

    this.elems_taskLists.innerHTML = "";

    for (let i = 0, len = this.tasks.length; i < len; i++)
    {
      this.elems_taskLists.appendChild(this.makeTaskDOM(this.tasks[i]));
    }
  }
  private makeTaskDOM = (task: Task): HTMLElement => {

    const elem_task = document.createElement("li");
    const elem_taskBtn = document.createElement("div");
    const elem_taskTitle = document.createElement("div");

    elem_task.className = `task task--${task.status == TaskStatus.TODO ? 'todo' : 'done'}`;
    elem_taskBtn.className = "task__btn";
    elem_taskTitle.className = "task__title";
    elem_taskTitle.textContent = task.title;
    elem_taskTitle.setAttribute("data-test", "task-title");

    elem_task.appendChild(elem_taskBtn);
    elem_task.appendChild(elem_taskTitle);

    return elem_task;
  }
}
