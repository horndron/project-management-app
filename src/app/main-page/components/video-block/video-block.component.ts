import { Component, Input } from '@angular/core';

@Component({
  selector: 'rsm-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss'],
})
export class VideoBlockComponent {
  @Input() title!: string;

  @Input() videoId!: string;
}
