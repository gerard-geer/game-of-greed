import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GameState } from './models/common';
import { GreedPlayerComponent } from './components/greed-player/greed-player.component';
import { TitleScreenComponent } from './components/title-screen/title-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'greed-app';
  state = GameState.MAIN_SCREEN;

  constructor() {}

  @ViewChild(GreedPlayerComponent) player!: GreedPlayerComponent;
  @ViewChild(TitleScreenComponent) titleScreen!: TitleScreenComponent;

  startGame() {
    this.state = GameState.GAMEPLAY;
    this.player.startNewGame();
  }

  returnToTitle() {
    this.state = GameState.MAIN_SCREEN;
  }

  ngAfterViewInit() {
  }
}
