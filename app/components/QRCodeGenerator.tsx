import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, Typography, Button, Space } from 'antd';
import { DownloadOutlined, PrinterOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface QRCodeGeneratorProps {
  eventId: number;
  userId: string;
  eventTitle: string;
  registrationId?: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  eventId,
  userId,
  eventTitle,
  registrationId
}) => {
  const qrData = JSON.stringify({
    eventId,
    userId,
    registrationId: registrationId || `${eventId}-${userId}-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: 'event_checkin'
  });

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `qr-${eventTitle.replace(/\s+/g, '-')}-${eventId}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${eventTitle}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 20px; 
              }
              .qr-container { 
                border: 2px solid #00afef; 
                border-radius: 12px; 
                padding: 20px; 
                display: inline-block; 
                background: white;
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h2>${eventTitle}</h2>
              <div>${document.getElementById('qr-code-svg')?.outerHTML}</div>
              <p>Scan this QR code for event check-in</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Card 
      className="glass-card"
      style={{ 
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(0, 175, 239, 0.15)',
        borderRadius: '16px'
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={4} style={{ color: '#00afef', marginBottom: 8 }}>
            QR Code Check-in
          </Title>
          <Text type="secondary">
            Scan this code at the event for attendance verification
          </Text>
        </div>
        
        <div style={{ 
          padding: '20px', 
          background: 'white', 
          borderRadius: '12px',
          display: 'inline-block',
          boxShadow: '0 4px 20px rgba(0, 175, 239, 0.1)'
        }}>
          <QRCodeSVG
            id="qr-code-svg"
            value={qrData}
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#00afef"
            bgColor="#ffffff"
          />
        </div>

        <div>
          <Text strong style={{ color: '#00afef' }}>
            Event: {eventTitle}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Registration ID: {registrationId || `${eventId}-${userId}`}
          </Text>
        </div>

        <Space>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={downloadQR}
            style={{ 
              background: 'linear-gradient(135deg, #00afef 0%, #0099d6 100%)',
              border: 'none'
            }}
          >
            Download QR
          </Button>
          <Button 
            icon={<PrinterOutlined />}
            onClick={printQR}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 175, 239, 0.1) 0%, rgba(0, 175, 239, 0.05) 100%)',
              borderColor: '#00afef',
              color: '#00afef'
            }}
          >
            Print QR
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default QRCodeGenerator;
