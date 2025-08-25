import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util';

declare global {
  var TextEncoder: typeof NodeTextEncoder;
  var TextDecoder: typeof NodeTextDecoder;
}

export {};