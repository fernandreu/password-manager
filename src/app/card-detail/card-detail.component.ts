import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PassCard, PassField} from 'src/app/model/pass-model';
import {Utils} from 'src/app/model/utils';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {DataService, IDataService} from 'src/app/services/data-service';

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
    @Inject(DataService) private dataService: IDataService
  ) { }

  ngOnInit() {
    const session = this.dataService.session;
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

  async returnToList() {
    await this.router.navigateByUrl('/list');
  }
}
