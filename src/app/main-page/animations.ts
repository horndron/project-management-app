import {
  animate, state, style, transition, trigger,
} from '@angular/animations';

export const enterComponent = trigger('card', [
  state('start', style({ opacity: '0', transform: 'translateY(50%)' })),
  state('end', style({ opacity: '1', transform: 'translateY(0)' })),
  transition('start <=> end', animate('8000')),
]);
