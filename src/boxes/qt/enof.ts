import { FullBox } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class enofBox extends FullBox {
  width: number;
  height: number;

  constructor(size?: number) {
    super('enof', size);
  }

  parse(stream: MultiBufferStream) {
    this.parseFullHeader(stream);
    this.width = stream.readUint32();
    this.height = stream.readUint32();
  }
}
