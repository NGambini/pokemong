import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgFuseModule, NgFusePipe, NgFuseService } from 'ng2-fuse';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { HeaderComponent } from './layout/header.component';

import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    ClarityModule.forRoot(),
    InfiniteScrollModule,
    NgFuseModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonDetailComponent,
    HeaderComponent
  ],
  providers: [NgFusePipe, NgFuseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
