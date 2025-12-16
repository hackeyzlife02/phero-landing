// Email template for waitlist confirmation sent to the user

export interface WaitlistConfirmationProps {
  name: string;
  isResubmission: boolean;
}

export function getWaitlistConfirmationEmail({ name, isResubmission }: WaitlistConfirmationProps): string {
  const greeting = name || 'there';

  if (isResubmission) {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>You're Already on the List</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    Good news - you're already on the PHERO waitlist. We'll be in touch soon.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #000000;">
    <tr>
      <td align="center" style="padding: 0;">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #7B2D9E 0%, #9A1B1B 100%);" bgcolor="#9A1B1B"></td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 520px;">
          <tr>
            <td style="padding: 48px 24px 56px 24px;">

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 48px;">
                    <span style="font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.03em;">PHERO</span>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 32px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width: 72px; height: 72px; border-radius: 50%; border: 2px solid #9A1B1B; text-align: center; vertical-align: middle; background-color: transparent; line-height: 68px;">
                          <span style="font-size: 28px; color: #9A1B1B;">&#10003;</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background-color: #0D0D0D; border: 1px solid #1A1A1A; border-radius: 20px; padding: 40px 32px;" bgcolor="#0D0D0D">

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 20px;">
                          <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                            You're already on the list
                          </h1>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 24px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 64px; height: 3px; border-radius: 2px; background: linear-gradient(90deg, #7B2D9E 0%, #9A1B1B 100%);" bgcolor="#9A1B1B"></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 28px;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #B3B3B3; text-align: center;">
                            Hi ${greeting}, no need to sign up again - we've already got you covered. Your spot is secured.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #141414; border-radius: 12px;">
                      <tr>
                        <td style="padding: 24px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td>
                                <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 600; color: #9A1B1B; text-transform: uppercase; letter-spacing: 0.08em;">
                                  Your status
                                </p>
                                <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #ffffff;">
                                  Waitlist confirmed
                                </p>
                              </td>
                              <td align="right" style="vertical-align: middle;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                  <tr>
                                    <td style="background: linear-gradient(135deg, #7B2D9E 0%, #9A1B1B 100%); border-radius: 20px; padding: 6px 14px;" bgcolor="#9A1B1B">
                                      <span style="font-size: 11px; font-weight: 600; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em;">Active</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 28px 0;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="height: 1px; background-color: #1F1F1F;"></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center">
                          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #666666; text-align: center;">
                            We'll reach out as soon as early access is available in your area. Stay tuned.
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-top: 48px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width: 24px; height: 1px; background-color: #333333;"></td>
                        <td style="padding: 0 12px;">
                          <span style="font-size: 11px; font-weight: 600; color: #4D4D4D; letter-spacing: 0.1em;">PHERO</span>
                        </td>
                        <td style="width: 24px; height: 1px; background-color: #333333;"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="height: 2px; background: linear-gradient(90deg, #7B2D9E 0%, #9A1B1B 100%);" bgcolor="#9A1B1B"></td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
  }

  // New signup email
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>You're on the List</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    Welcome to the future of personal styling. Early access is coming soon.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #000000;">
    <tr>
      <td align="center" style="padding: 0;">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #7B2D9E 0%, #9A1B1B 100%);" bgcolor="#9A1B1B"></td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 520px;">
          <tr>
            <td style="padding: 48px 24px 56px 24px;">

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 48px;">
                    <span style="font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.03em;">PHERO</span>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 32px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #7B2D9E 0%, #9A1B1B 100%); text-align: center; vertical-align: middle; line-height: 72px;" bgcolor="#9A1B1B">
                          <span style="font-size: 32px; color: #ffffff;">&#10003;</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background-color: #0D0D0D; border: 1px solid #1A1A1A; border-radius: 20px; padding: 40px 32px;" bgcolor="#0D0D0D">

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 20px;">
                          <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                            You're on the list
                          </h1>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 24px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="width: 64px; height: 3px; border-radius: 2px; background: linear-gradient(90deg, #7B2D9E 0%, #9A1B1B 100%);" bgcolor="#9A1B1B"></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="padding-bottom: 28px;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #B3B3B3; text-align: center;">
                            Hi ${greeting}, thanks for joining the waitlist. We're building something special, and you'll be among the first to experience it.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #141414; border-radius: 12px;">
                      <tr>
                        <td style="padding: 24px;">
                          <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #9A1B1B; text-transform: uppercase; letter-spacing: 0.08em;">
                            What's next
                          </p>
                          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #808080;">
                            We'll notify you as soon as early access opens in your area. In the meantime, follow us on social to see styling tips and sneak peeks.
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding-top: 48px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width: 24px; height: 1px; background-color: #333333;"></td>
                        <td style="padding: 0 12px;">
                          <span style="font-size: 11px; font-weight: 600; color: #4D4D4D; letter-spacing: 0.1em;">PHERO</span>
                        </td>
                        <td style="width: 24px; height: 1px; background-color: #333333;"></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="height: 2px; background: linear-gradient(90deg, #7B2D9E 0%, #9A1B1B 100%);" bgcolor="#9A1B1B"></td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}
