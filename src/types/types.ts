export interface Data {
    id: number;
    title: string;
    completed: boolean;
  }

export interface TaskListProps {
    data?: Data[];
    description?: string;
    id?: number;
    completed?: boolean;   
    changeData?(id: number): void;
    onDelete?(id:number): void;
    addTask?(newTask:Data): void;
}