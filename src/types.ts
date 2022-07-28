export interface Joke {
    id: number;
    text: string[];
}

export interface Limits {
    newest: number;
    oldest: number;
}

export type NavigationMode = 'filtered' | 'random' | 'sorted';

export enum RequestType {
    random,
    oldest,
    newest,
    filter,
    id
}

export type RequestData =
    | {
          limits: Limits;
          type: RequestType.random;
      }
    | { type: RequestType.oldest }
    | { type: RequestType.newest }
    | { type: RequestType.filter; text: string; offset: number }
    | { type: RequestType.id; id: number };

export type SlideDirection = 'slide-left' | 'slide-right';
