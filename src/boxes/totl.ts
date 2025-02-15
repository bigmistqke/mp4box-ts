import { Box } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class totlBox extends Box {
  bytessent: number;

  constructor(size?: number) {
    super('totl', size);
  }

  parse(stream: MultiBufferStream) {
    this.bytessent = stream.readUint32();
  }
}
