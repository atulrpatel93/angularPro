import { IncludedOrNot } from './inclusion';
import { PriceModel } from './priceModel';

export class GrandService {
  id: number;
  name: string;
  availNum: number;
  dateTimeFrom: string;
  dateTimeTo: string;
  promotionalDesc: string;
  videoUrl: string;
  inclusions: string;
  priceDetails: string;
  totalCost: number;
  quickBooksId: number;
  isPublished: boolean;
  minOrders: number;
  location: string;
  isTaxIncluded: boolean;
  taxCode: string;
  director: string;
  numOfReviews: number;
  tags: string[];
  details: string;
  includedOrNot: IncludedOrNot[];
  pricing: PriceModel[];
  destination: string;
  mainImage: any;

  constructor() {
    this.id = 0;
    this.name = '';
    this.availNum = 0;
    this.dateTimeFrom = '';
    this.dateTimeTo = '';
    this.promotionalDesc = '';
    this.videoUrl = '';
    this.inclusions = '';
    this.priceDetails = '';
    this.totalCost = 0;
    this.quickBooksId = 0;
    this.isPublished = false;
    this.minOrders = 0;
    this.location = '';
    this.isTaxIncluded = false;
    this.taxCode = '';
    this.director = '';
    this.numOfReviews = 1;
    this.tags = [];
    this.details = '';
    this.includedOrNot = [];
    this.pricing = [];
    this.destination = '';
  }
}
