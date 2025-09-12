import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    // Primary Colors
    colorPrimary: '#00afef',
    colorSuccess: '#00afef',
    colorWarning: '#00afef',
    colorError: '#00afef',
    colorInfo: '#00afef',
    colorTextBase: '#1f2937',
    colorBgBase: '#ffffff',
    // Typography
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSizeHeading1: 48,
    fontSizeHeading2: 36,
    fontSizeHeading3: 28,
    fontSizeHeading4: 24,
    fontSizeHeading5: 20,
    fontSizeLG: 18,
    fontSize: 16,
    fontSizeSM: 14,
    
    // Line Heights
    lineHeightHeading1: 1.2,
    lineHeightHeading2: 1.3,
    lineHeightHeading3: 1.35,
    lineHeightHeading4: 1.4,
    lineHeightHeading5: 1.5,
    lineHeight: 1.6,
    
    // Font Weights
    fontWeightStrong: 600,
    
    // Border Radius
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    borderRadiusXS: 6,
    
    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingMD: 16,
    paddingSM: 12,
    paddingXS: 8,
    paddingXXS: 4,
    
    margin: 16,
    marginLG: 24,
    marginMD: 16,
    marginSM: 12,
    marginXS: 8,
    marginXXS: 4,
    
    // Shadows
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    boxShadowSecondary: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    
    // Colors
    colorBgContainer: 'rgba(255, 255, 255, 0.95)',
    colorBgElevated: 'rgba(255, 255, 255, 0.98)',
    colorBgLayout: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    
    // Control Heights
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,
    controlHeightXS: 24,
    
    // Motion
    motionDurationFast: '0.1s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 44,
      controlHeightLG: 52,
      controlHeightSM: 36,
      primaryShadow: '0 4px 12px rgba(0, 175, 239, 0.4)',
      defaultShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    Card: {
      borderRadius: 16,
      borderRadiusLG: 20,
      paddingLG: 32,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      headerBg: 'transparent',
    },
    Input: {
      borderRadius: 12,
      controlHeight: 44,
      controlHeightLG: 52,
      controlHeightSM: 36,
      paddingInline: 16,
      fontSize: 16,
      activeShadow: '0 0 0 3px rgba(0, 175, 239, 0.1)',
    },
    Select: {
      borderRadius: 12,
      controlHeight: 44,
      controlHeightLG: 52,
      controlHeightSM: 36,
    },
    Menu: {
      borderRadius: 12,
      itemBorderRadius: 8,
      itemHeight: 44,
      itemPaddingInline: 16,
      fontSize: 15,
    },
    Modal: {
      borderRadius: 20,
      paddingLG: 32,
      headerBg: 'transparent',
    },
    Drawer: {
      borderRadius: 20,
      paddingLG: 32,
    },
    Table: {
      borderRadius: 12,
      headerBg: 'rgba(248, 250, 252, 0.8)',
      headerSplitColor: 'rgba(226, 232, 240, 0.5)',
    },
    Tabs: {
      borderRadius: 12,
      itemActiveColor: '#00afef',
      itemHoverColor: '#33bef0',
      itemSelectedColor: '#00afef',
    },
    Badge: {
      borderRadius: 8,
    },
    Tag: {
      borderRadius: 8,
    },
    Alert: {
      borderRadius: 12,
      paddingContentHorizontal: 20,
      paddingContentVertical: 16,
    },
    Notification: {
      borderRadius: 16,
      paddingContentHorizontal: 24,
      paddingContentVertical: 20,
    },
    Message: {
      borderRadius: 12,
      paddingContentHorizontal: 20,
      paddingContentVertical: 12,
    },
    Progress: {
      borderRadius: 8,
    },
    Switch: {
      borderRadius: 16,
    },
    Slider: {
      borderRadius: 8,
    },
    Rate: {
      fontSize: 20,
    },
    Avatar: {
      borderRadius: 12,
    },
    Tooltip: {
      borderRadius: 8,
      paddingXS: 12,
    },
    Popover: {
      borderRadius: 12,
      paddingLG: 20,
    },
    Dropdown: {
      borderRadius: 12,
      paddingBlock: 8,
    },
  },
  algorithm: undefined, // Use default algorithm for light theme
};

export const antdDarkTheme: ThemeConfig = {
  ...antdTheme,
  token: {
    ...antdTheme.token,
    colorBgContainer: 'rgba(30, 41, 59, 0.95)',
    colorBgElevated: 'rgba(30, 41, 59, 0.98)',
    colorBgLayout: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    colorText: '#f1f5f9',
    colorTextSecondary: '#cbd5e1',
    colorTextTertiary: '#94a3b8',
    colorBorder: 'rgba(71, 85, 105, 0.3)',
    colorBorderSecondary: 'rgba(71, 85, 105, 0.2)',
  },
};
