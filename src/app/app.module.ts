import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BoardCellComponent } from './components/board-cell/board-cell.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { GreedPlayerComponent } from './components/greed-player/greed-player.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardCellComponent,
    ScoreboardComponent,
    GreedPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
