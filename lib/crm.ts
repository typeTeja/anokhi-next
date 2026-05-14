/**
 * CRM Integration Utility
 * 
 * To connect your CRM (e.g., HubSpot, Zoho, Salesforce):
 * 1. Add your CRM API Key/URL to your .env file
 * 2. Update the pushToCRM function below with your CRM's API requirements
 */

export async function pushToCRM(data: {
  name: string;
  email: string;
  phone: string;
  type: 'project' | 'contact';
  projectName?: string;
  inquiryType?: string;
  message?: string;
}) {
  try {

    const CRM_ENDPOINT = process.env.CRM_WEBHOOK_URL;
    if (!CRM_ENDPOINT) return;

    console.log('Pushing to CRM:', data);


    const response = await fetch(CRM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'Anokhi Homes Website',
        lead_type: data.type,
        contact_name: data.name,
        contact_email: data.email,
        contact_phone: data.phone,
        interested_in: data.projectName || data.inquiryType || 'General',
        notes: data.message || '',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('CRM Push Failed:', await response.text());
    }
    return { success: true };


  } catch (error) {
    console.error('CRM Integration Error:', error);
    return { success: false, error };
  }
}
