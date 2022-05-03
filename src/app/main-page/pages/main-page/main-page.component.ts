import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CardWithIcon } from '../../models/main-page.models';

@Component({
  selector: 'rsm-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  cards: CardWithIcon[] = [
    {
      title: 'It’s free',
      imageUrl: './assets/main-page/free.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscig elit, sed do eiusmod tempor incididunt ut labore aliqua. Ut enim adi minim veniam, quis nostrud exercitation',
    },
    {
      title: 'Tanya',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscig elit, sed do eiusmod tempor incididunt ut labore aliqua. Ut enim adi minim veniam, quis nostrud exercitation',
    },
    {
      title: 'Evgenia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscig elit, sed do eiusmod tempor incididunt ut labore aliqua. Ut enim adi minim veniam, quis nostrud exercitation',
    },
    {
      title: 'Andrey',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscig elit, sed do eiusmod tempor incididunt ut labore aliqua. Ut enim adi minim veniam, quis nostrud exercitation',
    },
    {
      title: 'A complete feature stack ready to help you',
      imageUrl: './assets/main-page/like.svg',
      description: 'This application will help you to achieve the set goals for an individual in a team or group of developers.',
    },
  ];

  mainPageText = {
    block1: {
      title: 'Make Business Flow Easyer With Us',
      description: 'Your amazing product deserves an easy way to manage it. Our app will provide you with a nessesary instruments no matter what your idea is about.',
    },
  };

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
