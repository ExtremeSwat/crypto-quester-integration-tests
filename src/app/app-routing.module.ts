import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableLandComponent } from './components/table-land/table-land.component';

const routes: Routes = [{
  path:'table-land',
  component: TableLandComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
