import React, { useState } from 'react';
import { Card, Typography, Rate, Input, Button, Space, Form, message, Divider } from 'antd';
import { MessageOutlined, StarOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Feedback {
  id: string;
  eventId: number;
  userId: string;
  rating: number;
  comment: string;
  timestamp: string;
  userName: string;
}

interface FeedbackSystemProps {
  eventId: number;
  eventTitle: string;
  userId: string;
  userName: string;
  canSubmitFeedback: boolean; // true if user has participated or is participating
  existingFeedbacks?: Feedback[];
}

export const FeedbackSystem: React.FC<FeedbackSystemProps> = ({
  eventId,
  eventTitle,
  userId,
  userName,
  canSubmitFeedback,
  existingFeedbacks = []
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(existingFeedbacks);

  // Check if current user has already submitted feedback
  const userFeedback = feedbacks.find(f => f.userId === userId);

  const submitFeedback = async (values: { rating: number; comment: string }) => {
    setSubmitting(true);
    
    try {
      const newFeedback: Feedback = {
        id: `feedback-${eventId}-${userId}-${Date.now()}`,
        eventId,
        userId,
        rating: values.rating,
        comment: values.comment,
        timestamp: new Date().toISOString(),
        userName
      };

      // Save to localStorage (in real app, this would be an API call)
      const existingFeedbacksKey = `feedbacks-${eventId}`;
      const storedFeedbacks = localStorage.getItem(existingFeedbacksKey);
      const allFeedbacks = storedFeedbacks ? JSON.parse(storedFeedbacks) : [];
      
      // Update or add feedback
      const updatedFeedbacks = userFeedback 
        ? allFeedbacks.map((f: Feedback) => f.userId === userId ? newFeedback : f)
        : [...allFeedbacks, newFeedback];
      
      localStorage.setItem(existingFeedbacksKey, JSON.stringify(updatedFeedbacks));
      setFeedbacks(updatedFeedbacks);
      
      message.success(userFeedback ? 'Feedback updated successfully!' : 'Feedback submitted successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = feedbacks.length > 0 
    ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length 
    : 0;

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
          <MessageOutlined style={{ fontSize: '32px', color: '#00afef', marginBottom: '12px' }} />
          <Title level={4} style={{ color: '#00afef', marginBottom: 8 }}>
            Event Feedback
          </Title>
          <Text type="secondary">
            Share your experience about "{eventTitle}"
          </Text>
        </div>

        {/* Overall Rating Display */}
        {feedbacks.length > 0 && (
          <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(0, 175, 239, 0.05)', borderRadius: '12px' }}>
            <Space direction="vertical" size="small">
              <Text strong style={{ color: '#00afef' }}>Overall Rating</Text>
              <Rate disabled value={averageRating} style={{ color: '#00afef' }} />
              <Text type="secondary">
                {averageRating.toFixed(1)} out of 5 ({feedbacks.length} review{feedbacks.length !== 1 ? 's' : ''})
              </Text>
            </Space>
          </div>
        )}

        {/* Feedback Form */}
        {canSubmitFeedback && (
          <>
            <Divider style={{ borderColor: '#00afef' }} />
            <div>
              <Title level={5} style={{ color: '#00afef', marginBottom: 16 }}>
                {userFeedback ? 'Update Your Feedback' : 'Submit Your Feedback'}
              </Title>
              <Form
                form={form}
                layout="vertical"
                onFinish={submitFeedback}
                initialValues={userFeedback ? { rating: userFeedback.rating, comment: userFeedback.comment } : {}}
              >
                <Form.Item
                  name="rating"
                  label={<Text strong>Rating</Text>}
                  rules={[{ required: true, message: 'Please provide a rating!' }]}
                >
                  <Rate style={{ color: '#00afef' }} />
                </Form.Item>

                <Form.Item
                  name="comment"
                  label={<Text strong>Comments</Text>}
                  rules={[{ required: true, message: 'Please share your thoughts!' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Share your experience, what you learned, suggestions for improvement..."
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(0, 175, 239, 0.2)',
                      borderRadius: '8px'
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    icon={<SendOutlined />}
                    style={{
                      background: 'linear-gradient(135deg, #00afef 0%, #0099d6 100%)',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  >
                    {userFeedback ? 'Update Feedback' : 'Submit Feedback'}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </>
        )}

        {/* Display Existing Feedbacks */}
        {feedbacks.length > 0 && (
          <>
            <Divider style={{ borderColor: '#00afef' }} />
            <div>
              <Title level={5} style={{ color: '#00afef', marginBottom: 16 }}>
                Participant Reviews ({feedbacks.length})
              </Title>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {feedbacks.slice(0, 5).map((feedback) => (
                  <Card
                    key={feedback.id}
                    size="small"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(0, 175, 239, 0.1)',
                      borderRadius: '8px'
                    }}
                  >
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong style={{ color: '#00afef' }}>{feedback.userName}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {new Date(feedback.timestamp).toLocaleDateString()}
                        </Text>
                      </div>
                      <Rate disabled value={feedback.rating} style={{ fontSize: '14px', color: '#00afef' }} />
                      <Paragraph style={{ marginBottom: 0, fontSize: '14px' }}>
                        {feedback.comment}
                      </Paragraph>
                    </Space>
                  </Card>
                ))}
                {feedbacks.length > 5 && (
                  <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>
                    And {feedbacks.length - 5} more review{feedbacks.length - 5 !== 1 ? 's' : ''}...
                  </Text>
                )}
              </Space>
            </div>
          </>
        )}

        {!canSubmitFeedback && (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            background: 'rgba(0, 175, 239, 0.05)', 
            borderRadius: '12px',
            border: '1px dashed rgba(0, 175, 239, 0.3)'
          }}>
            <StarOutlined style={{ fontSize: '24px', color: '#00afef', marginBottom: '8px' }} />
            <Text type="secondary">
              You need to register and participate in this event to leave feedback.
            </Text>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default FeedbackSystem;
