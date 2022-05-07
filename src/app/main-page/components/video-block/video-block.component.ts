import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'rsm-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss'],
})
export class VideoBlockComponent implements OnInit {
  @Input() title!: string;

  @Input() videoId!: string;

  video = false;

  videoUrl!: SafeResourceUrl;

  constructor(private readonly domsanitazer: DomSanitizer) {}

  ngOnInit() {
    this.getVideoUrl();
  }

  getVideoUrl(): void {
    this.videoUrl = this.domsanitazer
      .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}?autoplay=1`);
  }

  onVideo(): void {
    this.video = true;
  }
}
