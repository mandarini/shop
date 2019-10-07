import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { AngularFireMessagingModule } from "@angular/fire/messaging";

import { AppRoutingModule } from "./app-routing.module";

import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductComponent } from "./components/product/product.component";
import { LoginComponent } from "./components/login/login.component";
import { ManageComponent } from "./components/manage/manage.component";
import { NewProductComponent } from "./components/manage/new-product/new-product.component";
import { UsersComponent } from "./components/manage/users/users.component";
import { CreateProductComponent } from "./components/product/create-product/create-product.component";
import { environment } from "src/environments/environment";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DeleteModalComponent } from "./components/delete-modal/delete-modal.component";
import { CommentsComponent } from "./components/product/comments/comments.component";
import { CreateCommentComponent } from "./components/product/comments/create-comment/create-comment.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    LoginComponent,
    ManageComponent,
    NewProductComponent,
    UsersComponent,
    CreateProductComponent,
    DeleteModalComponent,
    CommentsComponent,
    CreateCommentComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  entryComponents: [DeleteModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
