export interface Joke {
    id: number;
    text: string[];
}

export type SlideDirection = 'slide-left' | 'slide-right';

export enum RequestType {
    random,
    oldest,
    newest,
    filter,
    id
}

export type RequestData =
    | {
          type: RequestType.random;
      }
    | { type: RequestType.oldest }
    | { type: RequestType.newest }
    | { type: RequestType.filter; text: string }
    | { type: RequestType.id; id: number };
