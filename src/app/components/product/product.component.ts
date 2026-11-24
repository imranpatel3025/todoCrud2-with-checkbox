import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { productsArr } from 'src/app/const/products';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Iproduct } from 'src/app/model/products.model';
import { UuidService } from 'src/app/service/uuid.service';
import { Istdudent } from 'src/app/model/student.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  // imports: [BrowserAnimationsModule]
})
export class ProductComponent implements OnInit {

  @ViewChild('productNameRef') productNameRef !: ElementRef<HTMLInputElement>
  @ViewChild('productBrandRef') productBrandRef !: ElementRef<HTMLInputElement>
  @ViewChild('productImgRef') productImgRef !: ElementRef<HTMLInputElement>
  @ViewChild('productPriceRef') productPriceRef!: ElementRef<HTMLInputElement>
  @ViewChild('productDescriptionRef') productDescriptionRef!: ElementRef<HTMLInputElement>

  isInEditMode: boolean = false
  productsArr = productsArr

  constructor(private _uuidService: UuidService) { }

  updateId: string = ''
  onAddProduct() {
    let newProduct: Iproduct = {
      productName: this.productNameRef.nativeElement.value,
      brand: this.productBrandRef.nativeElement.value,
      price: +this.productPriceRef.nativeElement.value,
      img: this.productImgRef.nativeElement.value,
      description: this.productDescriptionRef.nativeElement.value,
      id: this._uuidService.getUuid()
    }
    productsArr.unshift(newProduct)

    this.productNameRef.nativeElement.value = ''
    this.productBrandRef.nativeElement.value = ''
    this.productPriceRef.nativeElement.value = ''
    this.productImgRef.nativeElement.value = ''
    this.productDescriptionRef.nativeElement.value = ''
  }

  onEditProduct(product: Iproduct) {
    this.productNameRef.nativeElement.value = product.productName
    this.productBrandRef.nativeElement.value = product.brand
    this.productImgRef.nativeElement.value = product.img
    this.productPriceRef.nativeElement.value = product.price.toString()
    this.productDescriptionRef.nativeElement.value = product.description

    this.isInEditMode = true
    this.updateId = product.id
  }

  onUpdateProduct() {
    let updatedObj : Iproduct = {
      productName : this.productNameRef.nativeElement.value,
      brand : this.productBrandRef.nativeElement.value,
      img : this.productImgRef.nativeElement.value,
      price : +this.productPriceRef.nativeElement.value,
      description : this.productDescriptionRef.nativeElement.value ,
      id : this.updateId
    }

    let getIndex = productsArr.findIndex(p => p.id === this.updateId)
    productsArr[getIndex] = updatedObj

    this.isInEditMode = false

    this.productNameRef.nativeElement.value = ''
    this.productBrandRef.nativeElement.value = ''
    this.productPriceRef.nativeElement.value = ''
    this.productImgRef.nativeElement.value = ''
    this.productDescriptionRef.nativeElement.value = ''
  }

  onProductRemove(removeId: string) {
    let getConfirm = confirm(`Are you sure, you want to Remove With id is ${removeId}`)
    if (getConfirm) {
      let getIndex = productsArr.findIndex(p => p.id === removeId)
      productsArr.splice(getIndex, 1)
    }
  }

  ngOnInit(): void {
  }

}
