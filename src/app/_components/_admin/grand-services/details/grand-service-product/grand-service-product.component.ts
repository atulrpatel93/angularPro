import { EnumsHelper } from 'src/app/_helpers/enums.helper';
import { VendorService } from './../../../../../_services/vendor.service';
import { GrandService } from './../../../../../_models/grandService';
import { Component, OnInit } from '@angular/core';
import { UIHelper } from 'src/app/_helpers/ui.helper';
import { ActivatedRoute } from '@angular/router';
import { GrandServicesService } from 'src/app/_services/grandServices.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_models/productService';
import { ProductsService } from 'src/app/_services/products.service';
import { ProductType } from 'src/app/_helpers/product.helper';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { PriceModelService } from 'src/app/_services/priceModel.service';
import { PriceModel } from 'src/app/_models/priceModel';

@Component({
  selector: 'app-grand-service-product',
  templateUrl: './grand-service-product.component.html',
  styleUrls: ['./grand-service-product.component.less']
})
export class GrandServiceProductComponent implements OnInit {
  productTypeName: string;
  formErrors: string[];
  grandService: GrandService;
  form: FormGroup;
  products: Product[];
  productLabel = 'Product';
  serviceLabel = 'Service';
  activeTab: number;
  vendorsList: string[];
  showRoomOccupancy: boolean;
  priceModels: PriceModel[];

  constructor(private uiHelper: UIHelper, private route: ActivatedRoute, private productsService: ProductsService,
              private grandServicesService: GrandServicesService, private formBuilder: FormBuilder,
              private vendorService: VendorService, private priceModelService: PriceModelService) { }

  ngOnInit() {
    this.formErrors = [];
    this.products = new Array<Product>();

    this.route.params.subscribe(params => {
      const grandServiceName = params.name;
      this.productTypeName = params.productType.charAt(0).toUpperCase() + params.productType.toLowerCase().slice(1);

      switch (ProductType[this.productTypeName]) {
        case ProductType.Accommodation: {
            this.productLabel = 'Accommodation';
            this.serviceLabel = 'Room';
            this.activeTab = 3;
            this.showRoomOccupancy = true;
            break;
          }
          case ProductType.Transportation: {
            this.productLabel = 'Transportation';
            this.serviceLabel = 'Seat';
            this.activeTab = 4;
            break;
          }
          case ProductType.Airlines: {
            this.productLabel = 'Airline';
            this.serviceLabel = 'Seat';
            this.activeTab = 5;
            break;
          }
          case ProductType.Entertainment: {
            this.productLabel = 'Entertainment';
            this.serviceLabel = 'Service';
            this.activeTab = 6;
            break;
          }
        default:
          if (this.productTypeName === 'Tourguides') {
            this.productTypeName = 'Optional Excursions';
            this.productLabel = 'Optional Excursions';
            this.serviceLabel = 'Service';
            this.activeTab = 7;
          }
          break;
      }

      this.vendorService.getListByType(this.productTypeName).subscribe((vendors) => {
        this.vendorsList = vendors.map(({ name }) => name);
      });

      this.grandServicesService.get(grandServiceName)
        .subscribe((data) => {
          this.productsService.getList(data.id, this.productTypeName)
            .subscribe((data2) => {
              this.products = data2;
              this.grandService = data;
              this.createFormGroup();

              this.priceModelService.getByGrandService(data.id).subscribe(obj => {
                this.priceModels = obj;

                this.changeOccupancy();
              });
          });
      });
   });
  }

  validateVendor($event) {
    const inputValue = $event.target.value;
    if (this.vendorsList.indexOf(inputValue) === -1) {
      alert('Please select a vendor from the list');

      // clear input
      $event.target.value = '';
    }
  }

  save() {
    const newProducts: Product[] = this.form.value.products as Product[];

    try {
      newProducts.forEach(p => {
        if (p.id <= 0) { p.id = null; }

        p.services.forEach(s => {
          s.grandServiceId = p.grandServiceId;
          s.productTypeName = p.productTypeName;

          if (s.productTypeName === 'Accommodation') {
            if (isNaN(Number(s.name.substr(s.name.length - 1, 1))) || s.name.substr(s.name.length - 2, 1) !== '-') {
              throw new Error('Make sure all room names have the "-#" formula');
            }
          }

          if (s.id <= 0 ) { s.id = null; }
          if (s.quickBooksId <= 0) { s.quickBooksId = null; }
        });
      });
    } catch (e) {
      alert(e.message);
      return false;
    }

    this.productsService.save(newProducts, this.grandService.id)
      .subscribe((res) => {
        location.reload();
    }, error => {
      this.addErrors(error.error);
    });
  }

  addErrors(errors: { [s: string]: {}; } | ArrayLike<{}>): void {
    this.formErrors = [];
    Object.entries(errors).forEach(
      ([key, value]) => this.formErrors.push(key + ': ' + value));

    this.uiHelper.scrollToTop();
  }

  addProduct() {
    const product = new Product();
    this.products.push(product);
    this.createFormGroupForProduct(product, this.products.length - 1);
  }

  addService(productIndex: number) {
    const service = new ProductService();
    this.products[productIndex].services.push(service);
    this.createFormGroupForSingleService(service, productIndex, 0);
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      products: this.formBuilder.array([])
    });

    this.products.forEach((product, i) => {
      this.createFormGroupForProduct(product, i);
    });
  }

  createFormGroupForProduct(product: Product, productIndex: number) {
    const control = this.form.controls.products as FormArray;

    control.push(this.formBuilder.group({
      id: product.id,
      grandServiceId: this.grandService.id,
      vendorName: product.vendorName,
      productTypeName: this.productTypeName,
      dateTimeFrom: product.dateTimeFrom,
      dateTimeTo: product.dateTimeTo,
      services: this.formBuilder.array([]),
      orderBy: product.orderBy
    }));

    product.services.forEach((service, i) => {
      this.createFormGroupForSingleService(service, productIndex, i);
    });
  }

  createFormGroupForSingleService(service: ProductService, productIndex: number, serviceIndex: number) {
    const control: FormArray = (this.form.controls.products as FormArray).at(productIndex).get('services') as FormArray;

    control.push(this.formBuilder.group({
      id: service.id,
      quickBooksId: service.quickBooksId,
      name: service.name,
      availNum: service.availNum,
      minOccupancy: service.minOccupancy,
      maxOccupancy: service.maxOccupancy,
      cost: service.cost,
      roomOccupancy: service.roomOccupancy,
      orderBy: service.orderBy
    }));
  }

  deleteService(productId: number, serviceId: number) {
    this.productsService.deleteService(serviceId).subscribe((res) => {
      this.ngOnInit();
    });
  }
  deleteProduct(productId: number) {
    this.productsService.delete(productId).subscribe((res) => {
      this.ngOnInit();
    });
  }

  changeOccupancy() {
    const occupancyRows = document.querySelectorAll('.occupancyRow');

    occupancyRows.forEach(a => {
      const occValue = a.querySelectorAll('select').item(0).value;

      const priceModel = this.priceModels.filter(p => p.roomOccupancy === Number(occValue))[0] as PriceModel;

      (a.querySelector('.occPricing') as HTMLInputElement).value = priceModel.discountPrice.toString();
    });
  }
}
