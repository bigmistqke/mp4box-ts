export * from '#/box';
export * from '#/box-diff';
export * from '#/buffer';
export * from '#/create-file';
export * from '#/DataStream';
export * from '#/descriptor';
export * from '#/isofile';
export * from '#/log';
export * from '#/stream';
export * from '#/text-mp4';
import { UUID_BOXES } from '#/boxes/uuid';
import * as DESCRIPTORS from '#/descriptor';
import { registerBoxes, registerDescriptors } from '#/registry';
import * as BOXES from './all-boxes';

export const BoxParser = registerBoxes({ ...BOXES, ...UUID_BOXES });
registerDescriptors(DESCRIPTORS);
