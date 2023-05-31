import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Scene3DComponent } from './scene3-d/scene3-d.component';
import { ModelComponent } from './model/model.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PlayStarterComponent } from './play-starter/play-starter.component';
import { RulesComponent } from './rules/rules.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    Scene3DComponent,
    ModelComponent,
    DialogboxComponent,
    AccueilComponent,
    PlayStarterComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
