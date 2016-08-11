import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';
import {CompletenessPipe} from './completeness.pipe';


@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  directives: [TaskComponent, EditTaskDetailsComponent, NewTaskComponent],
  pipes: [CompletenessPipe],
  template: `
  <select (change)="onChange($event.target.value)">
    <option value="all">Show All</option>
    <option value="isDone">Show Done</option>
    <option value="notDone" selected="selected">Show Not Done</option>
  </select>
  <task-display *ngFor="#currentTask of taskList | completeness:selectedCompleteness"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
  </task-display>
  <edit-task-details *ngIf="selectedTask" [task]="selectedTask"></edit-task-details>
  <new-task (onSubmitNewTask)="createTask($event)"></new-task>
  `
})

export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  public selectedCompleteness: string = "notDone";
  public selectedTask: Task;
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  taskClicked(clickedTask: Task): void {
    console.log('child', clickedTask);
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }
  onChange(optionFromDropDownMenu) {
    this.selectedCompleteness = optionFromDropDownMenu;
    console.log(this.selectedCompleteness);
  }
  createTask(description: string): void {
    this.taskList.push(
      new Task(description, this.taskList.length)
    );
  }
}
