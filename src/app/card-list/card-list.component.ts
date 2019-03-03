import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SessionDataService} from '../session-data.service';
import {PassCard} from '../pass-model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Utils} from '../utils';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public isDark = Utils.isDark;

  public data: Array<PassCard> = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sessionDataService: SessionDataService,
  ) { }

  ngOnInit() {
    const session = this.sessionDataService.session;
    if (session === null) {
      this.router.navigateByUrl('/landing');
    }
    this.data = session.cards;
  }

  removeCard(card: PassCard) {
    this.data.splice(this.data.indexOf(card), 1);
  }

  drop(event: CdkDragDrop<PassCard[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  openCard(card: PassCard) {
    const index = this.data.indexOf(card);
    this.router.navigateByUrl('item/' + index);
  }
}
