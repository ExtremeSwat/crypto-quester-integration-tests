import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { connect, Connection, SUPPORTED_CHAINS, TableMetadata } from '@tableland/sdk';
import { TableLandOptions } from 'src/app/models/table-land-options.model';

@Component({
  selector: 'app-table-land',
  templateUrl: './table-land.component.html',
  styleUrls: ['./table-land.component.scss']
})
export class TableLandComponent implements OnInit {

  private tableland!: Connection;

  public options!: TableLandOptions;
  public listOfTables: TableMetadata[] = [];

  public displayedColumns: string[] = [];
  public tableContents: any[] = [];

  public tableIsReady: boolean = false;

  constructor(private _snackBar: MatSnackBar) {

  }

  public ngOnInit(): void {
    console.log('SUPPORTED_CHAINS', SUPPORTED_CHAINS);
  }

  public async onWalletConnect(): Promise<void> {
    // connecting to Goerli Network
    this.tableland = await connect({ network: "testnet", chain: "ethereum-goerli" });
    await this.tableland.siwe();

    this.options = new TableLandOptions(this.tableland.options?.chain, this.tableland.options.contract, this.tableland.options.network);
    this._snackBar.open('Wallet connected', 'OK');

    // grabbing current tables
    this.grabTables();
  }

  public async OnTabChange(event: any) {
    console.log('event', event);
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

  public async queryTable(tableName: string) {
    this.tableIsReady = false;

    const result = await this.tableland.read(`SELECT * FROM ${tableName}`);
    result.columns.forEach(c => this.displayedColumns.push(c.name));

    result.rows.forEach((result: any[]) => {
      result.forEach((r, i) => {
        const fieldName = this.displayedColumns[i];
        // @ts-ignore
        this.tableContents.push({
            fieldName: fieldName,
            value: r
          }
        )
      });
    });

    console.log('table contents', this.tableContents);

    this.tableIsReady = true;
  }

  private async grabTables(): Promise<void> {
    this.listOfTables = await this.tableland.list();
    console.log('current tables', this.listOfTables);
  }
}

