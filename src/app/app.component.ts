import { Component, OnInit, VERSION, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { IPageInfo, VirtualScrollerComponent } from "ngx-virtual-scroller";

const PageSize = 1;

const MaxItems = Infinity;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}
  @ViewChild(VirtualScrollerComponent)
  private virtualScroller: VirtualScrollerComponent;

  items: any[] = [];
  count = 0;
  needMore = true;
  timeout: any;

  ngOnInit(): void {}

  fetchMore() {
    const newItems: any[] = [];
    const pageSize = this.items.length > 0 ? PageSize : 10;

    for (let i = 0; i < pageSize; i++) {
      newItems.push({
        html: this.sanitizer.bypassSecurityTrustHtml(
          `<div style="height: ${this.getHeight()}px">${this.items.length +
            i}</div>`
        )
      });
    }
    newItems.reverse();
    this.items = [...newItems, ...this.items];
  }
  vsStart(pageInfo: IPageInfo) {
    console.log("vsStart", pageInfo);
    if (
      this.needMore &&
      pageInfo.startIndex <= 0 &&
      this.items.length < MaxItems
    ) {
      this.needMore = false;

      const scrollToEnd = this.items.length === 0;

      console.log("FETCHING MORE..");
      this.fetchMore();

      if (scrollToEnd) {
        this.virtualScroller.scrollToIndex(this.items.length - 1);
      } else {
        // scroll to index 1, but need left the event loop run, first
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          console.log("scroll => 1");
          this.virtualScroller.scrollToIndex(1);
        }, 100);
      }
    } else if (pageInfo.startIndex > 0) {
      this.needMore = true;
      console.log("need more");
    }
  }

  getHeight() {
    return 30;
    return Math.round(Math.random() * 50) + 20;
  }
}
