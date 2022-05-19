import {
  Component, EventEmitter, Input, Output, OnInit,
} from '@angular/core';

@Component({
  selector: 'rsm-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() title: string;

  @Output() changeTitle = new EventEmitter<string>();

  private originalTitle = '';

  public editMode = false;

  ngOnInit() {
    this.originalTitle = this.title;
  }

  public edit(event: Event): void {
    event.stopPropagation();

    this.editMode = true;
  }

  public cancel(event: Event): void {
    event.stopPropagation();

    this.editMode = false;
    this.title = this.originalTitle;
  }

  public save(event: Event): void {
    event.stopPropagation();

    this.changeTitle.emit(this.title);

    this.editMode = false;
    this.originalTitle = this.title;
  }
}
