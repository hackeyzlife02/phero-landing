// Email template for admin notification when someone joins the waitlist

export interface WaitlistAdminNotificationProps {
  name: string;
  email: string;
  age: string;
  city: string;
  state: string;
  relationshipStatus: string;
  isResubmission: boolean;
}

export function getWaitlistAdminNotificationEmail(props: WaitlistAdminNotificationProps): string {
  const { name, email, age, city, state, relationshipStatus, isResubmission } = props;

  const statusBadge = isResubmission
    ? '<span style="display: inline-block; padding: 4px 12px; background-color: rgba(234, 179, 8, 0.2); color: #eab308; border-radius: 9999px; font-size: 12px; font-weight: 500;">Re-submission</span>'
    : '<span style="display: inline-block; padding: 4px 12px; background-color: rgba(34, 197, 94, 0.2); color: #22c55e; border-radius: 9999px; font-size: 12px; font-weight: 500;">New Signup</span>';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isResubmission ? 'Waitlist Re-submission' : 'New Waitlist Signup'}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom: 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 700; color: #18181b; letter-spacing: -0.02em;">PHERO</span>
                  </td>
                  <td align="right">
                    ${statusBadge}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; padding: 32px;">
              <h1 style="margin: 0 0 24px 0; font-size: 18px; font-weight: 600; color: #18181b;">
                ${isResubmission ? 'Waitlist Re-submission' : 'New Waitlist Signup'}
              </h1>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                    <span style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Name</span>
                    <p style="margin: 4px 0 0 0; font-size: 15px; color: #18181b;">${name || '(not provided)'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                    <span style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
                    <p style="margin: 4px 0 0 0; font-size: 15px; color: #18181b;"><a href="mailto:${email}" style="color: #7b2d9e; text-decoration: none;">${email}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                    <span style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Age Range</span>
                    <p style="margin: 4px 0 0 0; font-size: 15px; color: #18181b;">${age || '(not provided)'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                    <span style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Location</span>
                    <p style="margin: 4px 0 0 0; font-size: 15px; color: #18181b;">${city || '(not provided)'}${state ? `, ${state}` : ''}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Relationship Status</span>
                    <p style="margin: 4px 0 0 0; font-size: 15px; color: #18181b;">${relationshipStatus || '(not provided)'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 24px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa;">
                This is an automated notification from the PHERO waitlist.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
