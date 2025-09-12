import React from 'react';
import { Card, Typography, Button, Space, Divider } from 'antd';
import { DownloadOutlined, PrinterOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface CertificateGeneratorProps {
  eventTitle: string;
  participantName: string;
  eventDate: string;
  eventDuration?: string;
  organizerName?: string;
  certificateId: string;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  eventTitle,
  participantName,
  eventDate,
  eventDuration,
  organizerName,
  certificateId
}) => {
  const downloadCertificate = () => {
    const certificateElement = document.getElementById('certificate-content');
    if (certificateElement) {
      // Create a new window for printing/downloading
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Certificate - ${eventTitle}</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                body { 
                  font-family: 'Poppins', Arial, sans-serif; 
                  margin: 0; 
                  padding: 20px; 
                  background: linear-gradient(135deg, #e6f7ff 0%, #b3ebff 100%);
                }
                .certificate { 
                  width: 800px; 
                  height: 600px; 
                  margin: 0 auto; 
                  background: white;
                  border: 8px solid #00afef;
                  border-radius: 20px;
                  padding: 40px;
                  box-shadow: 0 20px 40px rgba(0, 175, 239, 0.2);
                  position: relative;
                  overflow: hidden;
                }
                .certificate::before {
                  content: '';
                  position: absolute;
                  top: -50%;
                  left: -50%;
                  width: 200%;
                  height: 200%;
                  background: radial-gradient(circle, rgba(0, 175, 239, 0.05) 0%, transparent 70%);
                  z-index: 0;
                }
                .certificate-content {
                  position: relative;
                  z-index: 1;
                  text-align: center;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                }
                .header { color: #00afef; font-size: 36px; font-weight: 700; margin-bottom: 20px; }
                .title { font-size: 18px; color: #666; margin-bottom: 30px; }
                .participant { font-size: 32px; color: #333; font-weight: 600; margin: 20px 0; }
                .event { font-size: 24px; color: #00afef; font-weight: 500; margin: 20px 0; }
                .details { font-size: 16px; color: #666; margin: 10px 0; }
                .footer { display: flex; justify-content: space-between; align-items: end; margin-top: 40px; }
                .signature { text-align: center; }
                .signature-line { width: 200px; height: 2px; background: #00afef; margin: 20px auto 10px; }
                .cert-id { font-size: 12px; color: #999; }
                @media print {
                  body { background: white; }
                  .certificate { box-shadow: none; }
                }
              </style>
            </head>
            <body>
              <div class="certificate">
                <div class="certificate-content">
                  <div>
                    <div class="header">CERTIFICATE OF PARTICIPATION</div>
                    <div class="title">This is to certify that</div>
                    <div class="participant">${participantName}</div>
                    <div class="title">has successfully participated in</div>
                    <div class="event">${eventTitle}</div>
                    <div class="details">Date: ${new Date(eventDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</div>
                    ${eventDuration ? `<div class="details">Duration: ${eventDuration}</div>` : ''}
                  </div>
                  <div class="footer">
                    <div class="cert-id">Certificate ID: ${certificateId}</div>
                    <div class="signature">
                      <div class="signature-line"></div>
                      <div>${organizerName || 'Event Organizer'}</div>
                      <div style="font-size: 14px; color: #666;">Organizer</div>
                    </div>
                    <div style="color: #00afef; font-weight: 600;">EventSphere</div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        
        // Auto download as PDF (if supported)
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    }
  };

  return (
    <Card 
      className="glass-card"
      style={{ 
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(0, 175, 239, 0.15)',
        borderRadius: '16px'
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <TrophyOutlined style={{ fontSize: '48px', color: '#00afef', marginBottom: '16px' }} />
          <Title level={3} style={{ color: '#00afef', marginBottom: 8 }}>
            Certificate of Participation
          </Title>
          <Text type="secondary">
            Congratulations! You have successfully completed this event.
          </Text>
        </div>

        <Divider style={{ borderColor: '#00afef' }} />

        {/* Certificate Preview */}
        <div 
          id="certificate-content"
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            border: '3px solid #00afef',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 175, 239, 0.1)'
          }}
        >
          <Title level={2} style={{ color: '#00afef', marginBottom: '16px' }}>
            CERTIFICATE OF PARTICIPATION
          </Title>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            This is to certify that
          </Text>
          <Title level={3} style={{ color: '#333', margin: '16px 0' }}>
            {participantName}
          </Title>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            has successfully participated in
          </Text>
          <Title level={4} style={{ color: '#00afef', margin: '16px 0' }}>
            {eventTitle}
          </Title>
          <Space direction="vertical" size="small">
            <Text style={{ color: '#666' }}>
              Date: {new Date(eventDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            {eventDuration && (
              <Text style={{ color: '#666' }}>
                Duration: {eventDuration}
              </Text>
            )}
          </Space>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'end', 
            marginTop: '40px' 
          }}>
            <Text style={{ fontSize: '12px', color: '#999' }}>
              Certificate ID: {certificateId}
            </Text>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '150px', 
                height: '2px', 
                background: '#00afef', 
                margin: '0 auto 8px' 
              }} />
              <Text strong>{organizerName || 'Event Organizer'}</Text>
              <br />
              <Text style={{ fontSize: '12px', color: '#666' }}>Organizer</Text>
            </div>
            <Text strong style={{ color: '#00afef' }}>
              EventSphere
            </Text>
          </div>
        </div>

        <Space style={{ width: '100%', justifyContent: 'center' }}>
          <Button 
            type="primary" 
            size="large"
            icon={<DownloadOutlined />}
            onClick={downloadCertificate}
            style={{ 
              background: 'linear-gradient(135deg, #00afef 0%, #0099d6 100%)',
              border: 'none',
              borderRadius: '8px'
            }}
          >
            Download Certificate
          </Button>
          <Button 
            size="large"
            icon={<PrinterOutlined />}
            onClick={downloadCertificate}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 175, 239, 0.1) 0%, rgba(0, 175, 239, 0.05) 100%)',
              borderColor: '#00afef',
              color: '#00afef',
              borderRadius: '8px'
            }}
          >
            Print Certificate
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default CertificateGenerator;
