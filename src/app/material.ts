import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgModule} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const moduleList = [
  MatButtonModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatDividerModule,
  MatSnackBarModule,
];

@NgModule({
  imports: moduleList,
  exports: moduleList,
})
export class MaterialModule { }
