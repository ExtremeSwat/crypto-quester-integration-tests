import { Component, OnInit } from '@angular/core';
import { connect } from '@tableland/sdk';

@Component({
  selector: 'app-table-land',
  templateUrl: './table-land.component.html',
  styleUrls: ['./table-land.component.scss']
})
export class TableLandComponent implements OnInit {

  constructor() { }

  public async ngOnInit(): Promise<void> {
    //const tableland = await connect({ network: "testnet", chain: "polygon-mumbai", chainId: 5 });
    const tableland = await connect({ network: "testnet", chainId: 5 });
    console.log('tableLand', tableland);

    const { name } = await tableland.create(`id int primary key, name text`, { prefix: 'quickstart' })
    const writeRes = await tableland.write(`INSERT INTO ${name} VALUES (0, 'Bobby Tables')`);

    console.log('writeRes', writeRes);

    const readRes = await tableland.read(`SELECT * FROM ${name}`);

    console.log('readRes', readRes);
  }
}
