import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableLandComponent } from './components/table-land/table-land.component';
import { WalletConnectComponent } from './components/wallet-connect/wallet-connect.component';

const routes: Routes = [{
  path:'table-land',
  component: TableLandComponent
},{
  path:'contract-integration',
  component: WalletConnectComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
