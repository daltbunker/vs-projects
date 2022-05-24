import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { INewTask, ITask, IUpdatedTask } from "../models/TaskModel";

const taskAxios = axios.create();

taskAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

type Props = PropsWithChildren<{
  text: string;
}>;

export interface ITaskContext {
  tasks: ITask[] | undefined;
  getTasks: () => void;
  updateTask: (id: string, updatedTask: IUpdatedTask) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string, completed: boolean) => void;
  addTask: (task: INewTask) => void;
  sortObj: {
    sortedState: string;
    setSortedState: React.Dispatch<React.SetStateAction<string>>;
  };
  reverseObj: {
    reverseState: boolean;
    setReverseState: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export const TaskContext = React.createContext<ITaskContext | null>(null);

export default function TaskProvider({ children }: Props) {
  const [tasks, setTasks] = useState<ITask[] | undefined>(undefined);
  const [sortedState, setSortedState] = useState("completed");
  const [reverseState, setReverseState] = useState(false);

  const sortTasks = useCallback(
    (tasksArr: ITask[] | undefined) => {
      if (tasksArr) {
        tasksArr.sort((a, b) => {
          switch (sortedState) {
            case "priority":
              const priorityWeight = { low: 0, medium: 1, high: 2 };
              return priorityWeight[b.priority] - priorityWeight[a.priority];
            case "description":
              return a.description.localeCompare(b.description);
            case "completed":
              return a.completed ? 1 : -1;
            default:
              return 0;
          }
        });
        if (reverseState) {
          tasksArr.reverse();
        }
      }
    },
    [reverseState, sortedState]
  );

  const getTasks = useCallback(() => {
    taskAxios
      .get("/api/tasks")
      .then((resp) => {
        sortTasks(resp.data);
        setTasks(resp.data);
      })
      .catch((err) => console.error(err));
  }, [sortTasks]);

  useEffect(() => {
    setTasks((prevTasks) => {
      if (prevTasks) {
        const updatedTasks = [...prevTasks];
        sortTasks(updatedTasks);
        return updatedTasks;
      }
    });
  }, [sortedState, reverseState, sortTasks]);

  function addTask(task: INewTask): void {
    taskAxios
      .post("/api/tasks", task)
      .then((resp) => {
        setTasks((prevTasks) => {
          if (prevTasks) {
            const updatedTasks = [...prevTasks, resp.data];
            sortTasks(updatedTasks);
            return updatedTasks;
          }
          return [resp.data];
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function updateTask(id: string, updatedTask: IUpdatedTask): void {
    taskAxios
      .put(`/api/tasks/${id}`, updatedTask)
      .then((resp) => {
        setTasks((prevTasks) => {
          if (prevTasks) {
            const updatedTasks = [
              ...prevTasks.map((task) => {
                if (task._id === id) {
                  return resp.data;
                }
                return task;
              }),
            ];
            sortTasks(updatedTasks);
            return updatedTasks;
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function completeTask(id: string, completed: boolean) {
    taskAxios
      .put(`/api/tasks/${id}`, { completed })
      .then((resp) => {
        setTasks((prevTasks) => {
          if (prevTasks) {
            const updatedTasks = [
              ...prevTasks.map((task) => {
                if (task._id === id) {
                  return resp.data;
                }
                return task;
              }),
            ];
            sortTasks(updatedTasks);
            return updatedTasks;
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteTask(id: string) {
    taskAxios
      .delete(`/api/tasks/${id}`)
      .then(() => {
        setTasks((prevTasks) => {
          if (prevTasks) {
            const updatedTasks = [
              ...prevTasks.filter((task) => task._id !== id),
            ];
            sortTasks(updatedTasks);
            return updatedTasks;
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        updateTask,
        deleteTask,
        completeTask,
        addTask,
        sortObj: { sortedState, setSortedState },
        reverseObj: { reverseState, setReverseState },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
