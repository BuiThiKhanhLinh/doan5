import { BaseComponent } from 'src/app/lib/base.component';
import { Component, OnInit,Injector } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {
  list_lop:any;
  public tintucs:any;
  constructor(injector: Injector) { 
    super(injector);}

  ngOnInit(): void {
    Observable.combineLatest(
      this._api.get('api/tintuc/get-top3'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_lop = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    Observable.combineLatest(
      this._api.get('api/tintuc/get-all'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.tintucs = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    console.log(this.tintucs);
    console.log(this.list_lop);
  }

  catText(text: string, limit: number): string {
    if(text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }

}
