import { Box } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class dimmBox extends Box {
  bytessent: number;

  constructor(size?: number) {
    super('dimm', size);
  }

  parse(stream: MultiBufferStream) {
    this.bytessent = stream.readUint64();
  }
}
