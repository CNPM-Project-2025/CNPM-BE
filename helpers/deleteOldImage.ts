import { Logger } from '@nestjs/common';
import { unlink } from 'fs/promises';
import { join } from 'path';

const logger = new Logger('FileUtils');

export async function deleteOldImage(
  oldImagePath: string | null,
): Promise<void> {
  if (!oldImagePath) {
    return;
  }

  // Chuyển đường dẫn tương đối (/uploads/<folder>/<filename>) thành đường dẫn tuyệt đối
  const absolutePath = join(__dirname, '..', '..', 'public', oldImagePath);

  try {
    await unlink(absolutePath);
    logger.log(`Deleted old image: ${oldImagePath}`);
  } catch (error) {
    logger.warn(
      `Failed to delete old image: ${oldImagePath}. Error: ${error.message}`,
    );
  }
}
