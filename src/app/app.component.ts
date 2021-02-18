import { Component, OnInit, VERSION, ViewChild } from "@angular/core";
import { IPageInfo, VirtualScrollerComponent } from "ngx-virtual-scroller";

const PageSize = 10;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild(VirtualScrollerComponent)
  private virtualScroller: VirtualScrollerComponent;

  items: any[] = [];
  count = 0;
  needMore = true;

  ngOnInit(): void {}

  fetchMore() {
    const newItems: any[] = [];
    for (let i = 0; i < PageSize; i++) {
      newItems.push({
        html: `${-1 * (this.items.length + i)}`
      });
    }
    newItems.reverse();
    this.items = [...newItems, ...this.items];
  }
  vsStart(pageInfo: IPageInfo) {
    console.log("vsStart", pageInfo);
    if (this.needMore && pageInfo.startIndex <= 0) {
      this.needMore = false;

      this.fetchMore();
    } else if (pageInfo.startIndex > 0) {
      this.needMore = true;
    }
  }
}
