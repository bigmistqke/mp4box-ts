import { FullBox, SampleGroupEntry } from '#/box';
import { MultiBufferStream } from '#/buffer';
// import * as BOXES from '#/codecs-all';
import { SampleGroupRegistry } from '#/box-registry';
import { Log } from '#/log';

export class sgpdBox extends FullBox {
  grouping_type:
    | 'alst'
    | 'avll'
    | 'avss'
    | 'dtrt'
    | 'mvif'
    | 'prol'
    | 'rap'
    | 'rash'
    | 'roll'
    | 'scif'
    | 'scnm'
    | 'seig'
    | 'stsa'
    | 'sync'
    | 'tele'
    | 'tsas'
    | 'tscl'
    | 'vipr';
  default_length: number;
  default_group_description_index: number;
  default_sample_description_index: number;
  entries: SampleGroupEntry[];
  used: boolean;

  constructor(size?: number) {
    super('sgpd', size);
  }

  parse(stream: MultiBufferStream) {
    this.parseFullHeader(stream);
    this.grouping_type = stream.readString(4);
    Log.debug('BoxParser', 'Found Sample Groups of type ' + this.grouping_type);
    if (this.version === 1) {
      this.default_length = stream.readUint32();
    } else {
      this.default_length = 0;
    }
    if (this.version >= 2) {
      this.default_group_description_index = stream.readUint32();
    }
    this.entries = [];
    const entry_count = stream.readUint32();
    for (let i = 0; i < entry_count; i++) {
      let entry: SampleGroupEntry;
      if (SampleGroupRegistry[this.grouping_type + 'SampleGroupEntry']) {
        entry = new SampleGroupRegistry[this.grouping_type + 'SampleGroupEntry'](
          this.grouping_type,
        );
      } else {
        entry = new SampleGroupEntry(this.grouping_type);
      }
      this.entries.push(entry);
      if (this.version === 1) {
        if (this.default_length === 0) {
          entry.description_length = stream.readUint32();
        } else {
          entry.description_length = this.default_length;
        }
      } else {
        entry.description_length = this.default_length;
      }
      if (entry.write === SampleGroupEntry.prototype.write) {
        Log.info(
          'BoxParser',
          'SampleGroup for type ' +
            this.grouping_type +
            ' writing not yet implemented, keeping unparsed data in memory for later write',
        );
        // storing data
        entry.data = stream.readUint8Array(entry.description_length);
        // rewinding
        stream.position -= entry.description_length;
      }
      entry.parse(stream);
    }
  }

  /** @bundle writing/sgpd.js */
  write(stream: MultiBufferStream) {
    // leave version as read
    // this.version;
    this.flags = 0;
    this.size = 12;
    for (let i = 0; i < this.entries.length; i++) {
      let entry = this.entries[i];
      if (this.version === 1) {
        if (this.default_length === 0) {
          this.size += 4;
        }
        this.size += entry.data.length;
      }
    }
    this.writeHeader(stream);
    stream.writeString(this.grouping_type, null, 4);
    if (this.version === 1) {
      stream.writeUint32(this.default_length);
    }
    if (this.version >= 2) {
      stream.writeUint32(this.default_sample_description_index);
    }
    stream.writeUint32(this.entries.length);
    for (let i = 0; i < this.entries.length; i++) {
      let entry = this.entries[i];
      if (this.version === 1) {
        if (this.default_length === 0) {
          stream.writeUint32(entry.description_length);
        }
      }
      entry.write(stream);
    }
  }
}
