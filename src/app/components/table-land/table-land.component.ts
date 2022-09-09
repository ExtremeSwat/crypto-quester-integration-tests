import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { connect, Connection, SUPPORTED_CHAINS } from '@tableland/sdk';
import { TableLandOptions } from 'src/app/models/table-land-options.model';

@Component({
  selector: 'app-table-land',
  templateUrl: './table-land.component.html',
  styleUrls: ['./table-land.component.scss']
})
export class TableLandComponent implements OnInit {

  private tableland!: Connection;

  // muie TS
  public options!: any;

  constructor(private _snackBar: MatSnackBar) {

  }

  public async ngOnInit(): Promise<void> {
    // console.log('@tableland/sdk supports:', SUPPORTED_CHAINS);
    // var tables = await this.tableland.list();
    // console.log('tables', tables);
  }

  public async onWalletConnect(): Promise<void> {
    // connecting to Goerli Network
    this.tableland = await connect({ network: "testnet", chain: "ethereum-goerli" });
    await this.tableland.siwe();

    this.options = new TableLandOptions(this.tableland.options?.chain, this.tableland.options.contract, this.tableland.options.network);

    this._snackBar.open('Wallet connected');
  }

  // my_sdk_table_5_684
  public async onButtonClicked() {
    const { name } = await this.tableland.create(`id int primary key, name text`, { prefix: 'my_sdk_table' })

    console.log('table name', name);

    const writeRes = await this.tableland.write(`INSERT INTO ${name} VALUES (0, 'Bobby Tables')`);
    console.log('writing results', writeRes);

    const readRes = await this.tableland.read(`SELECT * FROM ${name}`);

    console.log('reading results', readRes);
  }
}

