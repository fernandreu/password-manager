import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PassCard} from '../model/pass-model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Utils} from '../model/utils';
import {DataService, IDataService} from '../services/data-service';
import {CloudServiceProvider} from '../services/cloud-service-provider';

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
    private cloudServiceProvider: CloudServiceProvider,
    @Inject(DataService) private dataService: IDataService,
  ) { }

  ngOnInit() {
    const session = this.dataService.session;
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

  saveSession() {
    this.cloudServiceProvider.getCloudService().saveData(this.dataService.accessToken, this.dataService.session, this.dataService.passwordHash)
      .then(() => console.log('Saved'))
      .catch((error) => console.error(error));
  }

  addCard() {
    const card = new PassCard({title: 'New card', color: '#cccccc'});
    this.data.push(card);
    this.openCard(card);
  }
}
