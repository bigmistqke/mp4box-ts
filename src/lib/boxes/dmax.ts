import { Box } from '#/box';
import { MultiBufferStream } from '#/buffer';

export class dmax extends Box {
  time: number;

  constructor(size?: number) {
    super('dmax', size);
  }

  parse(stream: MultiBufferStream) {
    this.time = stream.readUint32();
  }
}
