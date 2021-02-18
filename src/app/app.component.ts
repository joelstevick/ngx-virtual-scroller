import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  items: any[] = [
    {
      html: "this is a test"
    }
  ];

  vsStart(info) {
    console.log(info);
  }

  vsEnd(info) {
    console.log(info);
  }
}
