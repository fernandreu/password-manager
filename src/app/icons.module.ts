import {NgModule} from '@angular/core';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

const fabIconList = Object
  .keys(fab)
  .filter(x => x !== 'fab' && x.startsWith('fa'))
  .map(x => fab[x]);

const fasIconList = Object
  .keys(fas)
  .filter(x => x !== 'fas' && x.startsWith('fa'))
  .map(x => fas[x]);

const farIconList = Object
  .keys(far)
  .filter(x => x !== 'far' && x.startsWith('fa'))
  .map(x => far[x]);

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(...fabIconList);
    library.addIcons(...fasIconList);
    library.addIcons(...farIconList);
  }
}
