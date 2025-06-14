import { EventBus } from "../../../core/EventBus";
import { Cell, UnitType } from "../../../core/game/Game";
import { GameView } from "../../../core/game/GameView";
import { UserSettings } from "../../../core/game/UserSettings";
import {
  BuildMenuClosedEvent,
  BuildMenuOpenedEvent,
  MouseMoveEvent,
} from "../../InputHandler";
import { TransformHandler } from "../TransformHandler";
import { Layer } from "./Layer";

export class NukePreviewLayer implements Layer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private visible = false;
  private lastCell: Cell | null = null;
  private radius: number;
  private userSettings = new UserSettings();

  constructor(
    private game: GameView,
    private eventBus: EventBus,
    private transformHandler: TransformHandler,
  ) {
    this.radius = this.game.config().nukeMagnitudes(UnitType.AtomBomb).outer;
  }

  shouldTransform(): boolean {
    return true;
  }

  init() {
    this.redraw();
    this.eventBus.on(MouseMoveEvent, (e) => this.onMouseMove(e));
    this.eventBus.on(BuildMenuOpenedEvent, () => {
      this.visible = true;
    });
    this.eventBus.on(BuildMenuClosedEvent, () => {
      this.visible = false;
      this.clear();
    });
  }

  redraw() {
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d");
    if (ctx === null) throw new Error("2d context not supported");
    this.context = ctx;
    this.canvas.width = this.game.width();
    this.canvas.height = this.game.height();
  }

  private clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private draw() {
    if (!this.lastCell) return;
    this.clear();
    const ref = this.game.ref(this.lastCell.x, this.lastCell.y);
    const x = this.game.x(ref);
    const y = this.game.y(ref);
    this.context.beginPath();
    this.context.arc(x, y, this.radius, 0, Math.PI * 2);
    this.context.strokeStyle = "rgba(255,255,255,0.7)";
    this.context.lineWidth = 1;
    this.context.stroke();
  }

  private onMouseMove(e: MouseMoveEvent) {
    if (!this.visible || !this.userSettings.nukePreview()) return;
    const cell = this.transformHandler.screenToWorldCoordinates(e.x, e.y);
    if (!this.game.isValidCoord(cell.x, cell.y)) {
      this.clear();
      return;
    }
    this.lastCell = cell;
    this.draw();
  }

  renderLayer(context: CanvasRenderingContext2D) {
    if (!this.visible || !this.userSettings.nukePreview()) return;
    context.drawImage(
      this.canvas,
      -this.game.width() / 2,
      -this.game.height() / 2,
      this.game.width(),
      this.game.height(),
    );
  }
}
