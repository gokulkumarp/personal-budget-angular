import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  toggle = true;
  status = 'Enable';

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Click me!!' : 'Clicked';
  }
  constructor() {}

  ngOnInit(): void {}
}
