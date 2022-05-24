  // const mockData1 = {
  //   description: 'add border to home button',
  //   priority: Priority.High,
  //   completed: true,
  //   files: ['profile.tsx', 'profile.css'],
  //   notes: 'in profile.tsx line 120 added inline style'
  // }


export enum Priority {
  High = 'high',
  Medium = 'medium',
  Low = 'low'
}

export interface ITask {
  description: string;
  priority: Priority;
  completed: boolean,
  files: string[],
  notes: string,
  _id: string
}

export interface IUpdatedTask {
  description?: string;
  priority?: Priority;
  completed?: boolean,
  files?: string[],
  notes?: string,
}

export interface INewTask {
  description: string;
  priority?: Priority;
  completed?: boolean,
  files?: string[],
  notes?: string,
}