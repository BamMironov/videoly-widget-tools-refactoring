import { noop } from "./utils";

class Scheduler {
  timeout: number;
  onTimeout: () => void;

  constructor({ timeout = 0, onTimeout = noop }) {
    this.timeout = timeout;
    this.onTimeout = onTimeout;
  }

  schedule(taskCallback: () => void, delayTime?: number): Task {
    let task = new Task(taskCallback, delayTime);

    this.setTimeout(task);

    return task;
  }

  setTimeout(task: Task): void {
    window.setTimeout(() => {
      if (task.isRunning) {
        task.cancel();
        this.onTimeout();
      }
    }, this.timeout);
  }
}

class Task {
  id: number;

  constructor(callback: () => void, delayTime?: number) {
    this.id = window.setInterval(() => {
      try {
        callback();
      } catch (e) {
        this.cancel();
      }
    }, delayTime);
  }

  get isRunning(): boolean {
    return !!this.id;
  }

  cancel(): void {
    window.clearInterval(this.id);
    this.id = null;
  }
}

export default Scheduler;
