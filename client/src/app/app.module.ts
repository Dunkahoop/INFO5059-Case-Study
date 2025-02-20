import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// added imports
import { MatComponentsModule } from './mat-components/mat-components.module';
import { HomeComponent } from './home/home.component';
import { VendorModule } from './vendor/vendor.module';
@NgModule({
 declarations: [AppComponent, HomeComponent],
 imports: [
 BrowserModule,
 AppRoutingModule,
 BrowserAnimationsModule,
 MatComponentsModule,
 VendorModule
 ],
 providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
 ],
 bootstrap: [AppComponent],
 //declarations: [AppComponent, HomeComponent],
})
export class AppModule {}