# Intake form → Google Sheets

Leads from `/queries/intake` are sent to your site API, which forwards them to a Google Apps Script web app. Each submission becomes a new row in your spreadsheet.

## 1. Create the sheet

Create a Google Sheet with a header row (row 1):

| Submitted At | First Name | Email | Phone | Enquiry | Source |
|--------------|------------|-------|-------|---------|--------|

## 2. Add Apps Script

In the sheet: **Extensions → Apps Script**. Replace the default code with:

```javascript
/** Opening the web app URL in a browser uses GET — this confirms the deployment is live. */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "Khenbridge intake webhook is ready. Use POST to submit leads." }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.firstName || "",
      data.email || "",
      data.phone || "",
      data.enquiry || "",
      data.source || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

Save the project.

## 3. Deploy as web app

1. **Deploy → New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone** (required so your server can POST without Google sign-in)
5. Deploy and copy the **Web app URL**

## 4. Configure the website

In `.env.local` (local) and your hosting provider (production):

```env
INTAKE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```

Restart the dev server after changing env vars.

## 5. Test

1. Open your **Web app URL** in a browser. You should see JSON like `{"ok":true,"message":"..."}`.  
   If you see **Script function not found: doGet**, add the `doGet` function above, save, then **Deploy → Manage deployments → Edit → Version: New version → Deploy**.
2. Open `/queries/intake` on the site and submit a test enquiry.
3. Confirm a new row appears in the sheet.

Restart `npm run dev` after changing `.env.local`.

## Lead gen link

Share with your team:

```text
https://your-domain.com/queries/intake
```

`Source` will be `queries-intake` for submissions from this page.
