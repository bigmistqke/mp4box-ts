import { SampleGroupEntry } from '#/box';
import type { MultiBufferStream } from '#/buffer';
import { Log } from '#/log';

export class mvifSampleGroupEntry extends SampleGroupEntry {
  parse(stream: MultiBufferStream) {
    Log.warn('BoxParser', 'Sample Group type: ' + this.grouping_type + ' not fully parsed');
  }
}
