import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

const originalTextEncoder = global.TextEncoder
const originalTextDecoder = global.TextDecoder

if(typeof global.TextEncoder === 'undefined')
    global.TextEncoder = TextEncoder;
if(typeof global.TextDecoder === 'undefined')
    global.TextDecoder = TextDecoder;

afterAll(() => {
    if(originalTextEncoder === undefined)
        delete global.TextEncoder
    else global.TextEncoder = originalTextEncoder

    if(originalTextDecoder === undefined)
        delete global.TextDecoder
    else global.TextDecoder = originalTextDecoder
})