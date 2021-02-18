import { Component, OnInit, VERSION, ViewChild } from "@angular/core";
import { IPageInfo, VirtualScrollerComponent } from "ngx-virtual-scroller";

const PageSize = 10;

const MaxItems = 40;

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
        html: `${-1 * (this.items.length + i + 1)}`
      });
    }
    newItems.reverse();
    this.items = [...newItems, ...this.items];
  }
  vsStart(pageInfo: IPageInfo) {
    if (
      this.needMore &&
      pageInfo.startIndex <= 0 &&
      this.items.length < MaxItems
    ) {
      this.needMore = false;

      const scrollToEnd = this.items.length === 0;

      this.fetchMore();

      if (scrollToEnd) {
        this.virtualScroller.scrollToIndex(this.items.length - 1);
      } else {
        this.virtualScroller.scrollToIndex(1);
      }
    } else if (pageInfo.startIndex > 0) {
      this.needMore = true;
    }
  }

  getHeight() {
    return Math.round(Math.random() * 100) + 30;
  }
}
