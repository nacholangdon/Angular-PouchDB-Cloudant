import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  private user = '28aebd39-38ac-4ce9-ac59-7f69f2591574-bluemix';
  private pwd = '8e9a1b8b2212aa86dc619824f9679159a6cd860fb9443bb296bd49c5c6437be0';

  public messages: Array<any>;
  public cities: Array<any>;
  public deleteposters: Array<any> = [];
  public selectedcount = 0;
  public form: any;
  public city: string;

  public constructor(private database: DataService, private zone: NgZone) {
    this.messages = [];
    this.city = 'kc';
    this.cities = ['kc', 'dc', 'tm'];
  }

  public ngOnInit() {

    this.database.sync('https://' + this.user + ':' + this.pwd + '@28aebd39-38ac-4ce9-ac59-7f69f2591574-bluemix.cloudant.com/locosporalva');
    this.database.getChangeListener().subscribe(data => {
      for (let i = 0; i < data.change.docs.length; i++) {
        this.zone.run(() => {
          this.messages.push(data.change.docs[i]);
        });
      }
    });
    this.database.fetch().then(result => {
      this.messages = [];
      for (let i = 0; i < result.rows.length; i++) {
        this.messages.push(result.rows[i].doc);
      }
    }, error => {
      console.error(error);
    });
  }

}
