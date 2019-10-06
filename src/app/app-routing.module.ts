import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProductComponent } from "./components/product/product.component";
import { LoginComponent } from "./components/login/login.component";
import { ManageComponent } from "./components/manage/manage.component";
import { CreateProductComponent } from "./components/product/create-product/create-product.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "product/:id",
    component: ProductComponent
  },
  {
    path: "create",
    component: CreateProductComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "manage",
    component: ManageComponent
  },
  { path: "**", redirectTo: "home" },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
