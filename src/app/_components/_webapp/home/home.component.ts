import { EnumsHelper } from 'src/app/_helpers/enums.helper';
import { Component, OnInit } from '@angular/core';
import { GrandService } from 'src/app/_models/grandService';
import { GrandServicesService } from 'src/app/_services/grandServices.service';
import { Review } from 'src/app/_models/review';
import { ReviewService } from 'src/app/_services/review.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  grandServicesList: GrandService[];
  reviewsList: Review[];

  imageUrlArray = [
    'assets/images/slide1.jpg',
    'assets/images/slide2.jpg',
    'assets/images/slide3.jpg',
    'assets/images/slide4.jpg'
  ];

  config = {
    observer: true,
    direction: 'horizontal',
    threshold: 50,
    spaceBetween: 5,
    slidesPerView: 2,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      640: {
           slidesPerView: 1
          }
   },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  };

  selected = '0';
  tags: string[];
  featuredTags: string[];
  toursList: GrandService[];
  featuredToursLists: GrandService[];

  imgGallary: any[];

  constructor(public router: Router, private grandServicesService: GrandServicesService, private reviewService: ReviewService,
              private enumsHelper: EnumsHelper) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (window as any).ga('set', 'page', event.urlAfterRedirects);
        (window as any).ga('send', 'pageview');
      }
    });

    this.grandServicesList = this.toursList = this.featuredToursLists = this.reviewsList = [];

    this.tags = this.enumsHelper.GrandServicesTags;
    this.featuredTags = this.enumsHelper.GrandServicesFeaturedTags;

    this.imgGallary = [];

    // this.grandServicesService.getLiveList()
    this.grandServicesService.getByTag('Last Call,Featured,New Releases')
      .subscribe((data) => {
        this.grandServicesList = data;
        this.grandServicesList.forEach((element, i) => {
          element.numOfReviews = (Math.floor(Math.random() * 10) + 5);
          if (i < 10) {
            this.imgGallary.push({
              src: element.mainImage.url,
              title: element.name
            });
          }
        });

        setTimeout(() => {
          (document.querySelectorAll('.places')[1].querySelectorAll('ul > li')[0].querySelector('a') as HTMLAnchorElement).click();
        }, 250);
    });

    this.reviewService.getList()
      .subscribe((data) => {
        this.reviewsList = data;
    });
  }

  public featuredTourYearChange($event) {
    // const year = (document.querySelector('#ourFeaturedToursYear') as HTMLSelectElement).value;
    let tab = $event.target.getAttribute('id').replace('a_id_', '');
    if (tab === 'ourFeaturedToursYear') {
      tab = document.querySelector('.featuredToursLists .places ul li a[aria-expanded="true"]').getAttribute('id').replace('a_id_', '');
    }

    this.featuredToursLists = [];

    this.grandServicesList.forEach((tour) => {
      // if (tour.dateTimeFrom.indexOf(year) !== -1) {
        if (tour.tags.indexOf(tab) !== -1) {
          this.featuredToursLists.push(tour);
        }
      // }
    });
  }

  public tourYearChange($event) {
    const year = (document.querySelector('#ourToursYear') as HTMLSelectElement).value;
    let tab = $event.target.getAttribute('id').replace('a_id_', '');

    if (tab === 'ourToursYear') {
      tab = document.querySelector('.regularToursLists .places ul li a[aria-expanded="true"]').getAttribute('id').replace('a_id_', '');
    }

    this.toursList = [];

    this.grandServicesList.forEach((tour) => {
      if (tour.dateTimeFrom.indexOf(year) !== -1) {
        if (tour.tags.indexOf(tab) !== -1) {
          this.toursList.push(tour);
        }
      }
    });
  }
}
