export * from "./sector";
export * from "./instrument";
export * from "./restrictions";
export * from "./tradeHistory";
export * from "./notifications";
export * from "./directorateList";
export * from "./entryAndExitHistory";

export class SameSectorQuery {
  instrument: number;
  sector: number;
  constructor(instrument: number, sector: number) {
    this.instrument = instrument;
    this.sector = sector;
  }
}
