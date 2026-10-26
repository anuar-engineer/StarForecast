"""Envío de correo saliente por SMTP (SSL/TLS implícito, puerto 465).

Usa ``smtplib`` de la librería estándar. El envío es bloqueante, así que se
lanza desde una ``BackgroundTask`` de FastAPI (que lo ejecuta en un hilo) y
nunca retrasa ni rompe la respuesta HTTP: los fallos solo se registran.
"""

import logging
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr, make_msgid

from app.core.config import settings

logger = logging.getLogger(__name__)


def send_email(to: str, subject: str, body: str, reply_to: str | None = None) -> None:
    if not settings.mail_enabled:
        logger.warning("SMTP sin configurar: no se envía el correo '%s' a %s.", subject, to)
        return

    msg = EmailMessage()
    msg["From"] = formataddr((settings.mail_from_name, settings.mail_from))
    msg["To"] = to
    msg["Subject"] = subject
    msg["Message-ID"] = make_msgid(domain=settings.mail_from.split("@")[-1])
    if reply_to:
        msg["Reply-To"] = reply_to
    msg.set_content(body)

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, context=context, timeout=20) as smtp:
            smtp.login(settings.smtp_user, settings.smtp_password)
            smtp.send_message(msg)
    except Exception:
        logger.exception("No se pudo enviar el correo '%s' a %s.", subject, to)
