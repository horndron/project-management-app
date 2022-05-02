import { Component } from '@angular/core';
import { CardWithIcon } from '../../models/main-page.models';

@Component({
  selector: 'rsm-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  cards: CardWithIcon[] = [
    {
      title: 'It’s free',
      imageUrl: './assets/free.svg',
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
      imageUrl: './assets/like.svg',
      description: 'This application will help you to achieve the set goals for an individual in a team or group of developers.',
    },
  ];
}
