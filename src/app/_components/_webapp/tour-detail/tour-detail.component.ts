import { UploadService } from './../../../_services/upload.service';
import { FileType } from 'src/app/_helpers/file.helper';
import { UIHelper } from './../../../_helpers/ui.helper';
import { Component, OnInit } from '@angular/core';
import { GrandService } from 'src/app/_models/grandService';
import { GrandServicesService } from 'src/app/_services/grandServices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IncludedOrNot } from 'src/app/_models/inclusion';
import { Asset } from 'src/app/_models/asset';
import { ReviewService } from 'src/app/_services/review.service';
import { Review } from 'src/app/_models/review';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.less']
})
export class TourDetailComponent implements OnInit {

  config = {
    slidesPerView: 3,
    navigation: {
      nextEl: '.owl-next',
      prevEl: '.owl-prev',
    },
  };

  adults = '2';
  kids = '0';

  grandService: GrandService;
  includedOrNot: IncludedOrNot[];
  lastMinuteTours: GrandService[];

  images: Asset[];
  reviewsList: Review[];

  constructor(private grandServicesService: GrandServicesService, private uiHelper: UIHelper, private router: Router,
              private route: ActivatedRoute, private uploadService: UploadService, private reviewService: ReviewService) { }

  ngOnInit() {
    this.includedOrNot = this.images = this.lastMinuteTours = [];

    // get all last tours
    this.grandServicesService.getLastMinute().subscribe((data) => {
      this.lastMinuteTours = data;
    });

    this.route.params.subscribe(params => {
      const grandServiceName = params.tourName;

      this.grandServicesService.get(grandServiceName)
          .subscribe((data) => {
            this.grandService = data;
            this.includedOrNot = this.grandService.includedOrNot;

            this.uploadService.get(this.grandService.id, FileType.IMG).subscribe((assets) => {
              this.images = assets;
            });

            this.reviewService.getByGrandServiceId(this.grandService.id)
              .subscribe((rvs) => {
                this.reviewsList = [];
                this.reviewsList = rvs;
            });

            setTimeout(() => {
              this.uiHelper.scrollToTop();
            }, 100);
        });
    });
  }

  public expandInclusions(inclusionId: number) {
    const isHidden = document.querySelector('.inc_details.li_inc_' + inclusionId).classList.contains('hide');

    document.querySelectorAll('.inc_details').forEach((item) => {
      item.classList.add('hide');
    });

    if (isHidden) {
      document.querySelector('.inc_details.li_inc_' + inclusionId).classList.remove('hide');
    }
  }

  public bookNow() {
    const totalPeople = (Number(this.adults) + Number(this.kids));

    if (totalPeople >= 4) {
      alert('Please contact our office for more than 3 people in a room.');
      return false;
    }

    const urlParams = '/tour/booking/' + this.grandService.name + '/' + totalPeople;
    this.router.navigate([urlParams]);
  }

  public recalculatePrice() {
    const totalPeople = (Number(this.adults) + Number(this.kids));

    if (totalPeople >= 4) {
      alert('Please contact our office for more than 3 people in a room.');
      return false;
    }

    const priceDetails = this.grandService.pricing.filter((p) => {
      return p.roomOccupancy === totalPeople;
    })[0];

    (document.querySelector('[name="totalCost"]') as HTMLInputElement).value = '$' + priceDetails.discountPrice;
  }
}
