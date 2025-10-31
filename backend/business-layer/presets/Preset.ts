import { z } from 'zod';


export const UnknownPresetSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(3),
  amount: z.number().positive(),
  isLBP: z.preprocess((val) => typeof val === 'number' ? !!val : !!val, z.boolean()),
  isDeposit: z.preprocess((val) => typeof val === 'number' ? !!val : !!val, z.boolean()),

});
export const PresetSchema = UnknownPresetSchema.omit({ isDeposit: true });
export const AddPresetSchema = PresetSchema.omit({ id: true });


export type UnknownPreset = z.infer<typeof UnknownPresetSchema>;
export type Preset = z.infer<typeof PresetSchema>;
export type AddPreset = z.infer<typeof AddPresetSchema>;

