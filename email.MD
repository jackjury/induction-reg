Email authentication requirements & recommendations
We require that you set up these email authentication methods for your domain. Authenticated messages:

Help protect recipients from malicious messages, such as spoofing and phishing messages.
Help protect you and your organization from being impersonated.
Are less likely to be rejected or marked as spam by Gmail.
Set up email authentication for each of your sending domains at your domain provider. In addition to following the instructions we provide, you should also refer to your domain provider's email authentication instructions.

To verify messages are authenticated, Google performs checks on messages sent to Gmail accounts. To improve email delivery, we recommend that you always set up SPF, DKIM, and DMARC for your domains. Make sure you're meeting the minimum authentication requirements described in Sender Guidelines. Messages that aren’t authenticated with these methods might be marked as spam or rejected with a 5.7.26 error.

If you use an email service provider, verify that they authenticate your domain’s email with SPF and DKIM.

We recommend you always use the same domain for email authentication and hosting your public website.

SPF
SPF prevents spammers from sending unauthorized messages that appear to be from your domain. Set up SPF by publishing an SPF record at your domain. The SPF record for your domain should reference all email senders for your domain. If third-party senders aren't included in your SPF record, messages from these senders are more likely to be marked as spam. Learn how to define your SPF record and add it to your domain.

DKIM
Turn on DKIM for the domain that sends your email. Receiving servers use DKIM to verify that the domain owner actually sent the message. Learn how to turn on DKIM for your domain.

Important: Sending to personal Gmail accounts requires a DKIM key of 1024 bits or longer. For security reasons, we recommend using a 2048-bit key if your domain provider supports this. Learn more about DKIM key length.

DMARC
DMARC lets you tell receiving servers what to do with messages from your domain that don’t pass SPF or DKIM. Set up DMARC by publishing a DMARC record for your domain. To pass DMARC authentication, messages must be authenticated by SPF and/or DKIM. The authenticating domain must be the same domain that's in the message From: header. Learn how to add a DMARC record at your domain.

We recommend you set up DMARC reports so you can monitor email sent from your domain, or appears to have been sent from your domain. DMARC reports help you identify senders that may be impersonating your domain. Learn more about DMARC reports.

When you set up DMARC, you can then optionally set up BIMI to add your brand logo to messages sent from your domain. Learn how to add your brand logo with BIMI.
