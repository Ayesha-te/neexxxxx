const DEFAULT_ADMIN_WHATSAPP_NUMBER = "923057410110";

const DEFAULT_ADMIN_WHATSAPP_MESSAGE =
  "Hi, I'm contacting NexoRise Admin from the website regarding: ";

/**
 * Builds a wa.me deep link to the admin's WhatsApp number with an optional
 * pre-filled message, so the admin has context on where the chat came from.
 *
 * Note: this is only for "contact the admin" chat links. It is unrelated to
 * the separate NexoRise WhatsApp *Channel* link (whatsapp.com/channel/...)
 * used for training/updates, which does not take a `text` param the same way.
 */
export function getAdminWhatsAppLink(
  adminWhatsApp: string | undefined | null,
  message: string = DEFAULT_ADMIN_WHATSAPP_MESSAGE,
) {
  const digits = (adminWhatsApp ?? DEFAULT_ADMIN_WHATSAPP_NUMBER).replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
