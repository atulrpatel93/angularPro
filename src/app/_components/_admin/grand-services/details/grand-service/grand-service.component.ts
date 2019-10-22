import { CloneType } from './../../../../../_helpers/clone.helper';
import { CloneService } from './../../../../../_services/clone.service';
import { GrandService } from './../../../../../_models/grandService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GrandServicesService } from 'src/app/_services/grandServices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UIHelper } from 'src/app/_helpers/ui.helper';
import { AngularEditorConfig, AngularEditorModule  } from '@kolkov/angular-editor';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { UploadService } from 'src/app/_services/upload.service';
import { FileType } from 'src/app/_helpers/file.helper';
import { Asset } from 'src/app/_models/asset';
import { EnumsHelper } from 'src/app/_helpers/enums.helper';
import { IncludedOrNot } from 'src/app/_models/inclusion';

@Component({
  selector: 'app-grand-service',
  templateUrl: './grand-service.component.html',
  styleUrls: ['./grand-service.component.less']
})
export class GrandServiceComponent implements OnInit {
  editorConfig: AngularEditorConfig;
  filesFromServer: Asset[];
  form: FormGroup;
  formErrors: string[];
  grandService: GrandService;
  itineraryFile: File = null;
  availableTags: string[];
  includedOrNot: IncludedOrNot[];
  newInclusion: IncludedOrNot = {
    id: 0,
    details: '',
    iconUrl: '',
    isIncluded: false,
    title: ''
  };

  constructor(private grandServicesService: GrandServicesService, private formBuilder: FormBuilder,
              private uiHelper: UIHelper, private uploadService: UploadService,
              private cloneService: CloneService, private route: ActivatedRoute,
              private router: Router, private enumsHelper: EnumsHelper) { }

  ngOnInit() {
    this.includedOrNot = [];
    this.availableTags = this.enumsHelper.GrandServicesTags.concat(this.enumsHelper.GrandServicesFeaturedTags);

    this.filesFromServer = new Array<Asset>();
    this.formErrors = [];
    this.editorConfig = this.uiHelper.getEditorConfig();

    this.route.params.subscribe(params => {
      const grandServiceName = params.name;

      if (Number(grandServiceName) === 0) {
        this.grandService = new GrandService();
        this.form = this.createFormGroup();
      } else {
        this.grandServicesService.get(params.name)
          .subscribe((data) => {
            this.grandService = data;

            this.includedOrNot = this.grandService.includedOrNot;
            this.newInclusion.id = ((Math.floor(Math.random() * 1500) + 1) * -1);
            this.includedOrNot.unshift(this.newInclusion);

            this.markTags();

            this.uploadService.get(this.grandService.id, FileType.ITINERARY).subscribe((blob) => {
              blob.forEach((file) => {
                this.filesFromServer.push(file);
              });
            });

            this.grandService.tags = [];

            this.form = this.createFormGroup();
        });
      }
   });
  }

  markTags() {
    const tempGrandServiceTags = this.grandService.tags;

    setTimeout(() => {
      const elementsTags: NodeListOf<HTMLInputElement> = document.querySelectorAll('.grandServicesTags input');

      if (tempGrandServiceTags != null && tempGrandServiceTags.length > 0) {
        elementsTags.forEach((elm) => {
          if (tempGrandServiceTags.indexOf(elm.value) !== -1) {
            elm.checked = true;
          }
        });
      }
    }, 500);
  }

  save() {
    const newGrandService: GrandService = this.form.value.grandService as GrandService;
    newGrandService.tags = [];
    newGrandService.includedOrNot = [];

    const elementsTags: NodeListOf<HTMLInputElement> = document.querySelectorAll('.grandServicesTags input:checked');

    elementsTags.forEach((elm) => {
      newGrandService.tags.push(elm.value);
    });

    const elementsInclusions: NodeListOf<HTMLElement> = document.querySelectorAll('table.inclusions tbody tr');

    elementsInclusions.forEach((elm) => {
      let id = Number(elm.getAttribute('class').replace('inc', ''));
      if (id <= 0) {
        id = null;
      }

      const title = (elm.querySelector('[name="title"]') as HTMLInputElement).value;
      const details = elm.querySelector('[name="details"]').querySelector('#editor').innerHTML;
      let iconUrl = (elm.querySelector('[name="iconUrl"]') as HTMLInputElement).value;
      const isIncluded = (elm.querySelector('[name="isIncluded"]') as HTMLInputElement).checked;

      if (iconUrl === '') {
        iconUrl = 'https://static.thenounproject.com/png/1028317-200.png';
      }

      const tempInclusion: IncludedOrNot = {
        id,
        title,
        details,
        iconUrl,
        isIncluded
      };

      if (title !== '') {
        newGrandService.includedOrNot.push(tempInclusion);
      }
    });

    this.grandServicesService.save(newGrandService)
      .subscribe((savedGrandServiceData) => {
        this.grandService = savedGrandServiceData;

        if (this.itineraryFile === null) {
          location.reload();
          return;
        }
        const formData = new FormData();
        formData.append('file-1', this.itineraryFile, this.itineraryFile.name);
        formData.append('name-1', 'Itinerary');
        formData.append('grandServiceId-1', this.grandService.id.toString());
        formData.append('typeName-1', FileType.ITINERARY);

        this.uploadService.upload(formData).subscribe((assets) => {
          location.reload();
        }, error => {
          this.addErrors(error.error);
        });
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

  createFormGroup() {
    return this.formBuilder.group({
      grandService: this.formBuilder.group(this.grandService)
    });
  }

  public onFileChange(files: FileList) {
    this.itineraryFile = files.item(0);
    this.form.markAsDirty();
  }

  public inputChange() {
    this.form.markAsDirty();
  }

  removeFile(fileId: number, wrapperId: string) {
    this.uploadService.delete(this.grandService.id, fileId).subscribe(() => {
      document.getElementById(wrapperId).remove();
    });
  }

  clone() {
    this.cloneService.get(this.grandService.id, CloneType.GRAND_SERVICE).subscribe((data) => {
      window.location.href = '/tours/' + data.name + '/Tour';
    });
  }

  saveIncludedOrNot() {
    this.newInclusion.id = ((Math.floor(Math.random() * 1500) + 1) * -1);
    this.includedOrNot.unshift(this.newInclusion);
  }

  deleteIncludedOrNot(obj: any) {
    obj.target.parentNode.parentNode.remove();
  }
}
