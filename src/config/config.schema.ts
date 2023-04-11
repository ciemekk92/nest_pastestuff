import { z } from 'zod';

const ConfigurationSchema = z.object({
  CRON_INTERVAL: z.string()
});

export default ConfigurationSchema;
