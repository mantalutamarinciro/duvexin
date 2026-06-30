import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  if (!type || !id) {
    return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
  }

  if (type !== 'quote' && type !== 'invoice') {
    return NextResponse.json({ error: 'Unsupported type' }, { status: 400 });
  }

  // Determine base URL dynamically (use localhost in dev, or env var in prod)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
  const targetUrl = `${baseUrl}/print/${type}/${id}`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Masquer la bannière de cookies si elle persiste
    await page.evaluateOnNewDocument(() => {
      const style = document.createElement('style');
      style.innerHTML = '.cookie-banner-wrapper { display: none !important; }';
      document.head.appendChild(style);
    });
    
    // Go to the target URL (use networkidle2 to avoid timeout from dev server WebSockets)
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });

    await browser.close();

    // Return the PDF buffer as a response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${type}-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
