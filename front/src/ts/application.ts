
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

type Elements = {
  taskLists: HTMLElement | null;
  taskRegisterTitle: HTMLInputElement | null;
  taskRegister: HTMLElement | null;
}

export class Application {

  private tasks: Array<Task> = [];
  private elements: Elements = {} as Elements;

  start = async (): Promise<void> =>
  {
    this.elements.taskLists = document.querySelector(".task-list");
    this.elements.taskRegisterTitle = document.querySelector(".form__title");
    this.elements.taskRegister = document.querySelector(".form__submit");
    this.elements.taskRegister?.addEventListener("click", this.registerTask);

    await this.updateTasksData();

    return;
  };


  private updateTasksData = async (isDisplay: Boolean = true): Promise<void> => {
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

    if (isDisplay) this.displayTasks();
  }

  private displayTasks = (): void =>
  {
    if (this.elements.taskLists == null) return;

    this.elements.taskLists.innerHTML = "";

    for (let i = 0, len = this.tasks.length; i < len; i++)
    {
      this.elements.taskLists.appendChild(this.makeTaskDOM(this.tasks[i]));
    }
  }

  private makeTaskDOM = (task: Task): HTMLElement => {

    const elem_task = document.createElement("li");
    const elem_taskBtn = document.createElement("div");
    const elem_taskTitle = document.createElement("div");

    elem_task.className = `task task--${task.status == TaskStatus.TODO ? 'todo' : 'done'}`;
    elem_task.setAttribute("data-id", task.id.toString());
    elem_task.setAttribute("data-status", task.status.toString());

    elem_taskBtn.className = "task__btn";
    elem_taskBtn.addEventListener("click", this.updateTaskStatus);

    elem_taskTitle.className = "task__title";
    elem_taskTitle.textContent = task.title;
    elem_taskTitle.setAttribute("data-test", "task-title");

    elem_task.appendChild(elem_taskBtn);
    elem_task.appendChild(elem_taskTitle);

    return elem_task;
  }

  private registerTask = async (e: any): Promise<void> =>
  {
    e.preventDefault();

    const title = this.elements.taskRegisterTitle?.value;

    if (this.elements.taskRegisterTitle == null ||
      !this.validateTaskTitle(title as string)) return;

    const options: object = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      // body: `title=${title}`
      body: JSON.stringify({ title }),
    };

    const response = await fetch(`${API_URL}/api/tasks/register`, options);
    if (!response.ok) throw new Error("Network response was not ok.");

    this.updateTasksData();
  }

  private validateTaskTitle = (title: string): boolean => {
    title = title.trim();
    console.log(title);
    return (
      title != "" &&
      !(title.match(/[^A-Za-z0-9]+/))
    );
  }

  private updateTaskStatus = async (e: any): Promise<void> =>
  {
    e.preventDefault();

    const elem_task = e.target.parentNode;
    const body: Task = {
      id: parseInt(elem_task.getAttribute("data-id")),
      status: parseInt(elem_task.getAttribute("data-status")),
      title: elem_task.querySelector("[data-test=task-title]").textContent,
    }

    // Task Status Toggle
    body.status = body.status == 0 ? 1 : 0;

    const options: object = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${API_URL}/api/tasks/update`, options);
    if (!response.ok) throw new Error("Network response was not ok.");

    this.updateTasksData();
  }
}
