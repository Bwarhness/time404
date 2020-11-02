import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../catalog.service';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  $threads = this.catalogService.getThreads('gif')
  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
  }
}
