import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionDataService} from '../session-data.service';
import {PassCard, PassField} from '../pass-model';
import {Utils} from '../utils';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  public tint = Utils.tint;

  public card: PassCard = null;

  public openCount = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionDataService: SessionDataService
  ) { }

  ngOnInit() {
    const session = this.sessionDataService.session;
    if (session === null) {
      // TODO: Reroute this to the sign in page
    }
    this.route.params.subscribe(params => {
      const id = parseInt(params['id'], 10);
      if (id < 0 || id > session.cards.length) {
        // Reroute this to the card list page
        this.router.navigateByUrl('/list');
      }
      this.card = session.cards[params['id']];
    });
  }

  copyToClipboard(field: PassField) {
    Utils.copyToClipboard(field.value);
    // TODO: popup message telling the copy is done
  }

  addField() {
    const field = new PassField();
    field.key = 'New field';
    this.card.fields.push(field);
  }

  removeField(field: PassField) {
    this.card.fields.splice(this.card.fields.indexOf(field), 1);
  }

  drop(event: CdkDragDrop<PassField[]>) {
    moveItemInArray(this.card.fields, event.previousIndex, event.currentIndex);
  }

  returnToList() {
    this.router.navigateByUrl('/list');
  }
}
