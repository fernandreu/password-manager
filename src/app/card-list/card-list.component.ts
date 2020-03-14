import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {PassCard} from 'src/app/model/pass-model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Utils} from 'src/app/model/utils';
import {DataService, IDataService} from 'src/app/services/data-service';
import {CloudServiceProvider} from 'src/app/services/cloud-service-provider';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  private _currentFilter = '';

  public isDark = Utils.isDark;

  /**
   * This holds the full set of data corresponding to the session
   */
  private fullData: Array<PassCard> = null;

  /**
   * This holds the data currently being visualized, with filtering applied if needed
   */
  public data: Array<PassCard> = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cloudServiceProvider: CloudServiceProvider,
    private snackBar: MatSnackBar,
    @Inject(DataService) private dataService: IDataService,
  ) { }

  get currentFilter() {
    return this._currentFilter;
  }

  set currentFilter(value: string) {
    this._currentFilter = value;
    this.applyFilter();
  }

  ngOnInit() {
    const session = this.dataService.session;
    if (session === null) {
      this.router.navigateByUrl('/landing');
    }
    this.fullData = session.cards;
    this.data = this.fullData;
  }

  removeCard(card: PassCard) {
    this.fullData.splice(this.data.indexOf(card), 1);
    this.applyFilter();
  }

  drop(event: CdkDragDrop<PassCard[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  openCard(card: PassCard) {
    const index = this.fullData.indexOf(card);
    this.router.navigateByUrl('item/' + index);
  }

  saveSession() {
    this.cloudServiceProvider.getCloudService().saveData(
      this.dataService.accessToken,
      this.dataService.session,
      this.dataService.passwordHash
    )
      .then(() => {
        console.log('Saved');
        this.snackBar.open('Session was saved successfully', '', {
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error(error);
        this.snackBar.open('Session could not be saved', '', {
          duration: 3000,
        });
      });
  }

  addCard() {
    const card = new PassCard({title: 'New card', color: '#cccccc'});
    this.fullData.push(card);
    this.applyFilter();
    this.openCard(card);
  }

  applyFilter() {
    if (this._currentFilter === '') {
      // This will allow card reordering to work
      this.data = this.fullData;
    } else {
      // TODO: There should be some visual indication that data ordering will just be temporary
      this.data = this.fullData.filter(x => x.title.includes(this.currentFilter));
    }
  }
}
