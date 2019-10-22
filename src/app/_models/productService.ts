export class ProductService {
    id: number;
    quickBooksId: number;
    created: string;
    updated: string;
    name: string;
    availNum: number;
    cost: number;
    minOccupancy: number;
    maxOccupancy: number;
    grandServiceId: number;
    productTypeName: string;
    roomOccupancy: number;
    totalCost: number;
    orderBy: number;

    constructor() {
        this.id = 0;
        this.quickBooksId = 0;
        this.created = '';
        this.updated = '';
        this.name = '';
        this.availNum = 0;
        this.cost = 0;
        this.minOccupancy = 0;
        this.maxOccupancy = 0;
        this.grandServiceId = 0;
        this.productTypeName = '';
        this.roomOccupancy = 0;
        this.totalCost = 0;
        this.orderBy = 0;
    }
  }
