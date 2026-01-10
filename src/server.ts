import app from "./app.js";
import { logger } from "./infra/logger.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  logger.info(`Server running on PORT ${PORT}`);
});
