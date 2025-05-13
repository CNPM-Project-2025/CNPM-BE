import * as QRCode from 'qrcode';

/**
 * Converts a URL to a QR code string (base64)
 * @param url The input URL to encode in the QR code
 * @returns A promise resolving to the base64-encoded QR code image
 * @throws Error if QR code generation fails
 */
export function urlToQRCode(url: string) {
  try {
    if (!url) {
      throw new Error('URL is required');
    }
    // Generate QR code as base64 string
    const qrCodeBase64 = QRCode.toDataURL(url);
    return qrCodeBase64;
  } catch (error) {
    throw new Error(`Failed to generate QR code: ${error.message}`);
  }
}
