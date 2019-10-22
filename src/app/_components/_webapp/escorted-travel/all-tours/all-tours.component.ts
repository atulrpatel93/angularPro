import { Component, OnInit } from '@angular/core';
import { GrandService } from 'src/app/_models/grandService';
import { GrandServicesService } from 'src/app/_services/grandServices.service';
import { EnumsHelper } from 'src/app/_helpers/enums.helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-tours',
  templateUrl: './all-tours.component.html',
  styleUrls: ['./all-tours.component.less']
})
export class AllToursComponent implements OnInit {
  grandServicesList: GrandService[];
  public tag: string;


  constructor(private route: ActivatedRoute, private grandServicesService: GrandServicesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tag = params.tag;

      if (this.tag.toLowerCase() === 'all') {
        this.grandServicesService.getLiveList().subscribe((data) => {
          this.grandServicesList = data;
        });
      } else {
        let tagToLoad = this.tag;

        if (tagToLoad.toLowerCase() === 'international') {
          tagToLoad = 'Europe, Asia, South America';
        }

        this.grandServicesService.getByTag(tagToLoad).subscribe((data) => {
          this.grandServicesList = data;
        });
      }
    });
  }

}
