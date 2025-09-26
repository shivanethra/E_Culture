"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "ta" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Auth
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.fullName": "Full Name",
    "auth.forgotPassword": "Forgot Password?",
    "auth.dontHaveAccount": "Don't have an account?",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.signInToAccount": "Sign in to your account",
    "auth.createAccount": "Create your account",
    "auth.resetPassword": "Reset Password",
    "auth.backToLogin": "Back to Login",
    "auth.sendResetLink": "Send Reset Link",
    "auth.enterEmailForReset": "Enter your email address and we'll send you a link to reset your password.",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.alerts": "Alerts",
    "nav.profile": "Profile",
    "nav.history": "History",
    "nav.logout": "Logout",

    // Dashboard
    "dashboard.title": "Smart Poultry Control Dashboard",
    "dashboard.welcome": "Welcome back",
    "dashboard.overview": "Farm Overview",
    "dashboard.temperature": "Temperature",
    "dashboard.humidity": "Humidity",
    "dashboard.waterLeakage": "Water Leakage",
    "dashboard.feedWastage": "Feed Wastage",
    "dashboard.poultryHealth": "Poultry Health",
    "dashboard.missionControl": "Mission Control",
    "dashboard.currentMission": "Current Mission",
    "dashboard.feedingRoutine": "Feeding Routine",
    "dashboard.progress": "Progress",
    "dashboard.startMission": "Start Mission",
    "dashboard.pauseMission": "Pause Mission",
    "dashboard.stopMission": "Stop Mission",
    "dashboard.liveStream": "Live Stream",
    "dashboard.cameraFeed": "Camera Feed",
    "dashboard.normal": "Normal",
    "dashboard.warning": "Warning",
    "dashboard.critical": "Critical",
    "dashboard.healthy": "Healthy",
    "dashboard.inProgress": "In Progress",
    "dashboard.completed": "Completed",
    "dashboard.paused": "Paused",

    // Alerts
    "alerts.title": "Alerts & Notifications",
    "alerts.recent": "Recent Alerts",
    "alerts.all": "All",
    "alerts.critical": "Critical",
    "alerts.warning": "Warning",
    "alerts.info": "Info",
    "alerts.markAllRead": "Mark All as Read",
    "alerts.clearAll": "Clear All",
    "alerts.highTemperature": "High Temperature Alert",
    "alerts.lowHumidity": "Low Humidity Detected",
    "alerts.waterLeakage": "Water Leakage Detected",
    "alerts.feedingComplete": "Feeding Routine Completed",
    "alerts.systemMaintenance": "System Maintenance Required",
    "alerts.batteryLow": "Robot Battery Low",

    // Profile
    "profile.title": "Profile & Settings",
    "profile.personalInfo": "Personal Information",
    "profile.fullName": "Full Name",
    "profile.email": "Email Address",
    "profile.phone": "Phone Number",
    "profile.location": "Farm Location",
    "profile.bio": "Bio",
    "profile.systemSettings": "System Settings",
    "profile.notifications": "Notifications",
    "profile.emailNotifications": "Email Notifications",
    "profile.pushNotifications": "Push Notifications",
    "profile.smsAlerts": "SMS Alerts",
    "profile.alertThresholds": "Alert Thresholds",
    "profile.temperatureThreshold": "Temperature Threshold",
    "profile.humidityThreshold": "Humidity Threshold",
    "profile.saveChanges": "Save Changes",
    "profile.changePassword": "Change Password",

    // History
    "history.title": "Mission History & Logs",
    "history.missionHistory": "Mission History",
    "history.systemLogs": "System Logs",
    "history.exportData": "Export Data",
    "history.filterBy": "Filter by",
    "history.dateRange": "Date Range",
    "history.missionType": "Mission Type",
    "history.status": "Status",
    "history.feeding": "Feeding",
    "history.cleaning": "Cleaning",
    "history.monitoring": "Monitoring",
    "history.maintenance": "Maintenance",
    "history.duration": "Duration",
    "history.success": "Success",
    "history.failed": "Failed",
    "history.cancelled": "Cancelled",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.export": "Export",
    "common.refresh": "Refresh",
  },
  ta: {
    // Auth
    "auth.login": "உள்நுழைவு",
    "auth.signup": "பதிவு செய்யுங்கள்",
    "auth.email": "மின்னஞ்சல்",
    "auth.password": "கடவுச்சொல்",
    "auth.confirmPassword": "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    "auth.fullName": "முழு பெயர்",
    "auth.forgotPassword": "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    "auth.dontHaveAccount": "கணக்கு இல்லையா?",
    "auth.alreadyHaveAccount": "ஏற்கனவே கணக்கு உள்ளதா?",
    "auth.signInToAccount": "உங்கள் கணக்கில் உள்நுழையவும்",
    "auth.createAccount": "உங்கள் கணக்கை உருவாக்கவும்",
    "auth.resetPassword": "கடவுச்சொல்லை மீட்டமைக்கவும்",
    "auth.backToLogin": "உள்நுழைவுக்கு திரும்பவும்",
    "auth.sendResetLink": "மீட்டமைப்பு இணைப்பை அனுப்பவும்",
    "auth.enterEmailForReset": "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும், நாங்கள் உங்களுக்கு கடவுச்சொல்லை மீட்டமைக்க இணைப்பை அனுப்புவோம்.",

    // Navigation
    "nav.dashboard": "டாஷ்போர்டு",
    "nav.alerts": "எச்சரிக்கைகள்",
    "nav.profile": "சுயவிவரம்",
    "nav.history": "வரலாறு",
    "nav.logout": "வெளியேறு",

    // Dashboard
    "dashboard.title": "ஸ்மார்ட் கோழி கட்டுப்பாட்டு டாஷ்போர்டு",
    "dashboard.welcome": "மீண்டும் வரவேற்கிறோம்",
    "dashboard.overview": "பண்ணை மேலோட்டம்",
    "dashboard.temperature": "வெப்பநிலை",
    "dashboard.humidity": "ஈரப்பதம்",
    "dashboard.waterLeakage": "நீர் கசிவு",
    "dashboard.feedWastage": "தீவன விரயம்",
    "dashboard.poultryHealth": "கோழி ஆரோக்கியம்",
    "dashboard.missionControl": "பணி கட்டுப்பாடு",
    "dashboard.currentMission": "தற்போதைய பணி",
    "dashboard.feedingRoutine": "உணவளிக்கும் வழக்கம்",
    "dashboard.progress": "முன்னேற்றம்",
    "dashboard.startMission": "பணியைத் தொடங்கவும்",
    "dashboard.pauseMission": "பணியை இடைநிறுத்தவும்",
    "dashboard.stopMission": "பணியை நிறுத்தவும்",
    "dashboard.liveStream": "நேரடி ஒளிபரப்பு",
    "dashboard.cameraFeed": "கேமரா ஊட்டம்",
    "dashboard.normal": "சாதாரண",
    "dashboard.warning": "எச்சரிக்கை",
    "dashboard.critical": "முக்கியமான",
    "dashboard.healthy": "ஆரோக்கியமான",
    "dashboard.inProgress": "நடைபெற்று வருகிறது",
    "dashboard.completed": "முடிந்தது",
    "dashboard.paused": "இடைநிறுத்தப்பட்டது",

    // Alerts
    "alerts.title": "எச்சரிக்கைகள் மற்றும் அறிவிப்புகள்",
    "alerts.recent": "சமீபத்திய எச்சரிக்கைகள்",
    "alerts.all": "அனைத்தும்",
    "alerts.critical": "முக்கியமான",
    "alerts.warning": "எச்சரிக்கை",
    "alerts.info": "தகவல்",
    "alerts.markAllRead": "அனைத்தையும் படித்ததாக குறிக்கவும்",
    "alerts.clearAll": "அனைத்தையும் அழிக்கவும்",
    "alerts.highTemperature": "அதிக வெப்பநிலை எச்சரிக்கை",
    "alerts.lowHumidity": "குறைந்த ஈரப்பதம் கண்டறியப்பட்டது",
    "alerts.waterLeakage": "நீர் கசிவு கண்டறியப்பட்டது",
    "alerts.feedingComplete": "உணவளிக்கும் வழக்கம் முடிந்தது",
    "alerts.systemMaintenance": "கணினி பராமரிப்பு தேவை",
    "alerts.batteryLow": "ரோபோ பேட்டரி குறைவு",

    // Profile
    "profile.title": "சுயவிவரம் மற்றும் அமைப்புகள்",
    "profile.personalInfo": "தனிப்பட்ட தகவல்",
    "profile.fullName": "முழு பெயர்",
    "profile.email": "மின்னஞ்சல் முகவரி",
    "profile.phone": "தொலைபேசி எண்",
    "profile.location": "பண்ணை இடம்",
    "profile.bio": "சுயவிவரம்",
    "profile.systemSettings": "கணினி அமைப்புகள்",
    "profile.notifications": "அறிவிப்புகள்",
    "profile.emailNotifications": "மின்னஞ்சல் அறிவிப்புகள்",
    "profile.pushNotifications": "புஷ் அறிவிப்புகள்",
    "profile.smsAlerts": "SMS எச்சரிக்கைகள்",
    "profile.alertThresholds": "எச்சரிக்கை வரம்புகள்",
    "profile.temperatureThreshold": "வெப்பநிலை வரம்பு",
    "profile.humidityThreshold": "ஈரப்பதம் வரம்பு",
    "profile.saveChanges": "மாற்றங்களை சேமிக்கவும்",
    "profile.changePassword": "கடவுச்சொல்லை மாற்றவும்",

    // History
    "history.title": "பணி வரலாறு மற்றும் பதிவுகள்",
    "history.missionHistory": "பணி வரலாறு",
    "history.systemLogs": "கணினி பதிவுகள்",
    "history.exportData": "தரவை ஏற்றுமதி செய்யவும்",
    "history.filterBy": "வடிகட்டு",
    "history.dateRange": "தேதி வரம்பு",
    "history.missionType": "பணி வகை",
    "history.status": "நிலை",
    "history.feeding": "உணவளித்தல்",
    "history.cleaning": "சுத்தம் செய்தல்",
    "history.monitoring": "கண்காணிப்பு",
    "history.maintenance": "பராமரிப்பு",
    "history.duration": "கால அளவு",
    "history.success": "வெற்றி",
    "history.failed": "தோல்வி",
    "history.cancelled": "ரத்து செய்யப்பட்டது",

    // Common
    "common.loading": "ஏற்றுகிறது...",
    "common.save": "சேமிக்கவும்",
    "common.cancel": "ரத்து செய்யவும்",
    "common.delete": "அழிக்கவும்",
    "common.edit": "திருத்தவும்",
    "common.view": "பார்க்கவும்",
    "common.search": "தேடவும்",
    "common.filter": "வடிகட்டு",
    "common.export": "ஏற்றுமதி",
    "common.refresh": "புதுப்பிக்கவும்",
  },
  hi: {
    // Auth
    "auth.login": "लॉगिन",
    "auth.signup": "साइन अप",
    "auth.email": "ईमेल",
    "auth.password": "पासवर्ड",
    "auth.confirmPassword": "पासवर्ड की पुष्टि करें",
    "auth.fullName": "पूरा नाम",
    "auth.forgotPassword": "पासवर्ड भूल गए?",
    "auth.dontHaveAccount": "खाता नहीं है?",
    "auth.alreadyHaveAccount": "पहले से खाता है?",
    "auth.signInToAccount": "अपने खाते में साइन इन करें",
    "auth.createAccount": "अपना खाता बनाएं",
    "auth.resetPassword": "पासवर्ड रीसेट करें",
    "auth.backToLogin": "लॉगिन पर वापस जाएं",
    "auth.sendResetLink": "रीसेट लिंक भेजें",
    "auth.enterEmailForReset": "अपना ईमेल पता दर्ज करें और हम आपको पासवर्ड रीसेट करने के लिए एक लिंक भेजेंगे।",

    // Navigation
    "nav.dashboard": "डैशबोर्ड",
    "nav.alerts": "अलर्ट",
    "nav.profile": "प्रोफाइल",
    "nav.history": "इतिहास",
    "nav.logout": "लॉगआउट",

    // Dashboard
    "dashboard.title": "स्मार्ट पोल्ट्री कंट्रोल डैशबोर्ड",
    "dashboard.welcome": "वापस स्वागत है",
    "dashboard.overview": "फार्म अवलोकन",
    "dashboard.temperature": "तापमान",
    "dashboard.humidity": "आर्द्रता",
    "dashboard.waterLeakage": "पानी का रिसाव",
    "dashboard.feedWastage": "चारा बर्बादी",
    "dashboard.poultryHealth": "पोल्ट्री स्वास्थ्य",
    "dashboard.missionControl": "मिशन कंट्रोल",
    "dashboard.currentMission": "वर्तमान मिशन",
    "dashboard.feedingRoutine": "भोजन की दिनचर्या",
    "dashboard.progress": "प्रगति",
    "dashboard.startMission": "मिशन शुरू करें",
    "dashboard.pauseMission": "मिशन रोकें",
    "dashboard.stopMission": "मिशन बंद करें",
    "dashboard.liveStream": "लाइव स्ट्रीम",
    "dashboard.cameraFeed": "कैमरा फीड",
    "dashboard.normal": "सामान्य",
    "dashboard.warning": "चेतावनी",
    "dashboard.critical": "गंभीर",
    "dashboard.healthy": "स्वस्थ",
    "dashboard.inProgress": "प्रगति में",
    "dashboard.completed": "पूर्ण",
    "dashboard.paused": "रोका गया",

    // Alerts
    "alerts.title": "अलर्ट और सूचनाएं",
    "alerts.recent": "हाल के अलर्ट",
    "alerts.all": "सभी",
    "alerts.critical": "गंभीर",
    "alerts.warning": "चेतावनी",
    "alerts.info": "जानकारी",
    "alerts.markAllRead": "सभी को पढ़ा हुआ चिह्नित करें",
    "alerts.clearAll": "सभी साफ़ करें",
    "alerts.highTemperature": "उच्च तापमान अलर्ट",
    "alerts.lowHumidity": "कम आर्द्रता का पता चला",
    "alerts.waterLeakage": "पानी का रिसाव का पता चला",
    "alerts.feedingComplete": "भोजन की दिनचर्या पूर्ण",
    "alerts.systemMaintenance": "सिस्टम रखरखाव आवश्यक",
    "alerts.batteryLow": "रोबोट बैटरी कम",

    // Profile
    "profile.title": "प्रोफाइल और सेटिंग्स",
    "profile.personalInfo": "व्यक्तिगत जानकारी",
    "profile.fullName": "पूरा नाम",
    "profile.email": "ईमेल पता",
    "profile.phone": "फोन नंबर",
    "profile.location": "फार्म स्थान",
    "profile.bio": "बायो",
    "profile.systemSettings": "सिस्टम सेटिंग्स",
    "profile.notifications": "सूचनाएं",
    "profile.emailNotifications": "ईमेल सूचनाएं",
    "profile.pushNotifications": "पुश सूचनाएं",
    "profile.smsAlerts": "SMS अलर्ट",
    "profile.alertThresholds": "अलर्ट सीमा",
    "profile.temperatureThreshold": "तापमान सीमा",
    "profile.humidityThreshold": "आर्द्रता सीमा",
    "profile.saveChanges": "परिवर्तन सहेजें",
    "profile.changePassword": "पासवर्ड बदलें",

    // History
    "history.title": "मिशन इतिहास और लॉग",
    "history.missionHistory": "मिशन इतिहास",
    "history.systemLogs": "सिस्टम लॉग",
    "history.exportData": "डेटा निर्यात करें",
    "history.filterBy": "फिल्टर करें",
    "history.dateRange": "दिनांक सीमा",
    "history.missionType": "मिशन प्रकार",
    "history.status": "स्थिति",
    "history.feeding": "भोजन",
    "history.cleaning": "सफाई",
    "history.monitoring": "निगरानी",
    "history.maintenance": "रखरखाव",
    "history.duration": "अवधि",
    "history.success": "सफलता",
    "history.failed": "असफल",
    "history.cancelled": "रद्द",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.save": "सहेजें",
    "common.cancel": "रद्द करें",
    "common.delete": "हटाएं",
    "common.edit": "संपादित करें",
    "common.view": "देखें",
    "common.search": "खोजें",
    "common.filter": "फिल्टर",
    "common.export": "निर्यात",
    "common.refresh": "रीफ्रेश",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ta" || savedLanguage === "hi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("preferred-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
