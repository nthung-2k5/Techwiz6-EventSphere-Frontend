import { useEffect, useMemo, useRef, useState } from "react";
import { Card, Input, Button, Typography, message, Space, Tabs, Result, Row, Col, Tag } from "antd";
import { useAuth } from "../context/AuthContext";
import { useEvents } from "../context/EventContext";
import { Navigate } from "react-router";
import { CheckCircleOutlined, QrcodeOutlined, UploadOutlined, CameraOutlined } from "@ant-design/icons";
// QrReader v2 supports camera and image upload via legacyMode
// Install with: bun add react-qr-reader@^2
import QrReader from "react-qr-reader";

const { Title, Text } = Typography;

type ScanMode = "camera" | "upload";

export default function CheckinPage() {
    const { user } = useAuth();
    const { events } = useEvents();
    const [eventId, setEventId] = useState("");
    const [checkedInEvents, setCheckedInEvents] = useState<number[]>([]);
    const [scanResult, setScanResult] = useState<string>("");
    const [scanError, setScanError] = useState<string>("");
    const [mode, setMode] = useState<ScanMode>("upload");
    const uploadRef = useRef<any>(null);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const parsePayload = (payload: string): number | null => {
        // Support plain ID or JSON { eventId: number }
        try {
            const parsed = JSON.parse(payload);
            if (parsed && typeof parsed.eventId === "number") return parsed.eventId;
        } catch {}
        const n = Number(payload);
        return Number.isFinite(n) ? n : null;
    };

    const performCheckIn = (id: number) => {
        const event = events.find(e => e.id === id);
        if (!event) {
            message.error("Event not found");
            return;
        }
        if (!user.registeredEvents.includes(id)) {
            message.error("You are not registered for this event");
            return;
        }
        if (checkedInEvents.includes(id)) {
            message.warning("You have already checked in for this event");
            return;
        }
        setCheckedInEvents(prev => [...prev, id]);
        message.success(`Checked in successfully: ${event.title}`);
    };

    const handleCheckInManual = () => {
        const id = Number(eventId);
        if (!Number.isFinite(id)) {
            message.error("Please enter a valid ID");
            return;
        }
        performCheckIn(id);
        setEventId("");
    };

    const onScan = (data?: string | null) => {
        if (!data) return;
        setScanResult(data);
        const id = parsePayload(data);
        if (id == null) {
            setScanError("Invalid QR code");
            return;
        }
        performCheckIn(id);
    };

    const onError = (err: any) => {
        setScanError(String(err?.message || err) || "Camera error");
    };

    // Stop all active camera tracks (if any)
    const stopCameraTracks = () => {
        const videos = Array.from(document.querySelectorAll('video')) as HTMLVideoElement[];
        videos.forEach(v => {
            const stream = v.srcObject as MediaStream | null;
            if (stream) {
                stream.getTracks().forEach(t => t.stop());
                v.srcObject = null;
            }
        });
    };

    // Stop camera when switching away from camera tab or when unmounting
    useEffect(() => {
        if (mode !== 'camera') {
            stopCameraTracks();
        }
        return () => {
            stopCameraTracks();
        };
    }, [mode]);

    // Extra safety: stop camera on page/tab hide or unload
    useEffect(() => {
        const handleVisibility = () => {
            if (document.hidden) stopCameraTracks();
        };
        const handlePageHide = () => stopCameraTracks();
        const handleBeforeUnload = () => stopCameraTracks();

        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('pagehide', handlePageHide);
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            // ensure final stop on unmount
            stopCameraTracks();
        };
    }, []);

    // Unmount safeguard (in case component is removed without the above handlers firing)
    useEffect(() => {
        return () => {
            stopCameraTracks();
        };
    }, []);

    const tabs = [
        {
            key: "camera",
            label: (
                <span><CameraOutlined /> Open camera to scan QR</span>
            ),
            children: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-lg border-0">
                        <QrReader
                            delay={300}
                            onError={() => { /* ignore frame errors */ }}
                            onScan={(data: string | null) => {
                                if (data) onScan(data);
                            }}
                            style={{ width: "100%" }}
                            facingMode="environment"
                        />
                    </Card>
                    <Card title="Manual fallback" className="shadow-lg border-0">
                        <Space direction="vertical" className="w-full">
                            <Input
                                placeholder="Enter Event ID"
                                value={eventId}
                                onChange={(e) => setEventId(e.target.value)}
                                size="large"
                            />
                            <Button 
                                type="primary" 
                                size="large" 
                                icon={<CheckCircleOutlined />}
                                onClick={handleCheckInManual}
                                disabled={!eventId.trim()}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 border-none"
                            >
                                Check In
                            </Button>
                        </Space>
                    </Card>
                </div>
            )
        },
        {
            key: "upload",
            label: (
                <span><UploadOutlined /> Upload QR image</span>
            ),
            children: (
                <Card className="shadow-lg border-0">
                    <Space direction="vertical" className="w-full items-start">
                        <Text>Select an image that contains a QR code and the system will read it.</Text>
                        <div className="w-full">
                            <QrReader
                                ref={uploadRef as any}
                                delay={300}
                                onError={() => { /* ignore */ }}
                                onScan={(data: string | null) => { if (data) onScan(data); }}
                                legacyMode
                                style={{ display: 'none' }}
                            />
                            <Button onClick={() => (uploadRef as any)?.current?.openImageDialog?.()} type="primary" icon={<QrcodeOutlined />} className="bg-gradient-to-r from-blue-500 to-purple-600 border-none">
                                Choose QR image
                            </Button>
                        </div>
                    </Space>
                </Card>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <Card className="shadow-lg border-0 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-6 p-8 text-white">
                        <Title level={2} className="text-white mb-1">QR Check-in</Title>
                        <Text className="text-white/90">Scan the event QR code or enter the code manually to check in</Text>
                    </div>
                    <div className="px-6 pb-6">
                        <Tabs
                            activeKey={mode}
                            onChange={(k) => setMode(k as ScanMode)}
                            items={tabs as any}
                            destroyInactiveTabPane
                        />
                        {(scanResult || scanError) && (
                            <div className="mt-6">
                                {scanError ? (
                                    <Result status="warning" title="Could not read QR" subTitle={scanError} />
                                ) : (
                                    <Result status="success" title="QR read successfully" subTitle={scanResult} />
                                )}
                            </div>
                        )}
                    </div>
                </Card>

                {checkedInEvents.length > 0 && (
                    <Card title="Recent check-ins" className="shadow-lg border-0">
                        <Row gutter={[12, 12]}>
                            {checkedInEvents.map(id => {
                                const ev = events.find(e => e.id === id);
                                return (
                                    <Col key={id} xs={24} sm={12} md={8}>
                                        <Card hoverable>
                                            <Space direction="vertical">
                                                <Text strong>{ev?.title || `Sự kiện #${id}`}</Text>
                                                <Tag color="green">Đã check-in</Tag>
                                            </Space>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Card>
                )}
            </div>
        </div>
    );
}
  