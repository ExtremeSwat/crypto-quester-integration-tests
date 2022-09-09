import { Component, OnInit } from '@angular/core';
import { connect, Connection, SUPPORTED_CHAINS } from '@tableland/sdk';

@Component({
  selector: 'app-table-land',
  templateUrl: './table-land.component.html',
  styleUrls: ['./table-land.component.scss']
})
export class TableLandComponent implements OnInit {

  // @ts-ignore
  private tableland: Connection = null;

  constructor() {

  }

  public async ngOnInit(): Promise<void> {

    return;
    console.log('@tableland/sdk supports:', SUPPORTED_CHAINS);

    // connecting to Goerli Network
    this.tableland = await connect({ network: "testnet", chain: "ethereum-goerli" });
    await this.tableland.siwe();

    console.log('tableLandObject', this.tableland);


    var tables = await this.tableland.list();
    console.log('tables', tables);
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

