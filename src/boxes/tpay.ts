import { Box } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class tpayBox extends Box {
  bytessent: number;

  constructor(size?: number) {
    super('tpay', size);
  }

  parse(stream: MultiBufferStream) {
    this.bytessent = stream.readUint32();
  }
}
