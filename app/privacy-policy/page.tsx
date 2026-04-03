'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

export default function PrivacyPolicyPage() {
    const { t } = useLanguage();

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-royal-blue to-deep-maroon text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {t('Privacy Policy', 'गोपनीयता नीति')}
                    </h1>
                    <p className="text-lg opacity-90">
                        {t('Last updated: February 4, 2026', 'अंतिम अपडेट: 4 फरवरी, 2026')}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                    <div className="prose prose-lg max-w-none">

                        {/* Introduction */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-royal-blue mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center text-lg">1</span>
                                {t('Introduction', 'परिचय')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {t(
                                    'Welcome to VisionGuard ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website VisionGuard.com.',
                                    'VisionGuard ("हम," "हमारा," या "हमें") में आपका स्वागत है। हम आपकी व्यक्तिगत जानकारी और आपकी गोपनीयता के अधिकार की रक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट VisionGuard.com पर जाते हैं तो हम आपकी जानकारी कैसे एकत्र, उपयोग, प्रकट और सुरक्षित करते हैं।'
                                )}
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-royal-blue mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center text-lg">2</span>
                                {t('Information We Collect', 'हम कौन सी जानकारी एकत्र करते हैं')}
                            </h2>

                            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                                {t('Personal Information', 'व्यक्तिगत जानकारी')}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('When you register on our website, we may collect:', 'जब आप हमारी वेबसाइट पर पंजीकरण करते हैं, तो हम एकत्र कर सकते हैं:')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>{t('Name and email address', 'नाम और ईमेल पता')}</li>
                                <li>{t('Profile picture (if provided via social login)', 'प्रोफ़ाइल चित्र (यदि सोशल लॉगिन के माध्यम से प्रदान किया गया)')}</li>
                                <li>{t('Comments and blog submissions', 'टिप्पणियाँ और ब्लॉग सबमिशन')}</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                                {t('Automatically Collected Information', 'स्वचालित रूप से एकत्रित जानकारी')}
                            </h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>{t('Browser type and version', 'ब्राउज़र प्रकार और संस्करण')}</li>
                                <li>{t('Device information', 'डिवाइस जानकारी')}</li>
                                <li>{t('IP address', 'IP पता')}</li>
                                <li>{t('Pages visited and time spent', 'देखे गए पृष्ठ और बिताया गया समय')}</li>
                            </ul>
                        </div>

                        {/* How We Use Your Information */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-royal-blue mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center text-lg">3</span>
                                {t('How We Use Your Information', 'हम आपकी जानकारी का उपयोग कैसे करते हैं')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('We use the collected information to:', 'हम एकत्रित जानकारी का उपयोग इसके लिए करते हैं:')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>{t('Provide and maintain our services', 'हमारी सेवाएं प्रदान और बनाए रखना')}</li>
                                <li>{t('Allow you to comment on blogs and interact with content', 'आपको ब्लॉग पर टिप्पणी करने और सामग्री के साथ बातचीत करने की अनुमति देना')}</li>
                                <li>{t('Process and publish your blog submissions', 'आपके ब्लॉग सबमिशन को प्रोसेस और प्रकाशित करना')}</li>
                                <li>{t('Improve user experience', 'उपयोगकर्ता अनुभव में सुधार करना')}</li>
                                <li>{t('Send important updates about the platform', 'प्लेटफॉर्म के बारे में महत्वपूर्ण अपडेट भेजना')}</li>
                            </ul>
                        </div>

                        {/* Cookies */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-royal-blue mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center text-lg">4</span>
                                {t('Cookies', 'कुकीज़')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {t(
                                    'We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can control cookie settings through your browser.',
                                    'हम आपके ब्राउज़िंग अनुभव को बेहतर बनाने, आपकी प्राथमिकताओं को याद रखने और वेबसाइट ट्रैफ़िक का विश्लेषण करने के लिए कुकीज़ और समान ट्रैकिंग तकनीकों का उपयोग करते हैं। आप अपने ब्राउज़र के माध्यम से कुकी सेटिंग्स को नियंत्रित कर सकते हैं।'
                                )}
                            </p>
                        </div>

                        {/* Third-Party Services */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-royal-blue mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center text-lg">5</span>
                                {t('Third-Party Services', 'तृतीय-पक्ष सेवाएं')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('Our website uses the following third-party services:', 'हमारी वेबसाइट निम्नलिखित तृतीय-पक्ष सेवाओं का उपयोग करती है:')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li><strong>Supabase:</strong> {t('For authentication and data storage', 'प्रमाणीकरण और डेटा भंडारण के लिए')}</li>
                                <li><strong>Google/Microsoft OAuth:</strong> {t('For social login functionality', 'सोशल लॉगिन कार्यक्षमता के लिए')}</li>
                                <li><strong>Vercel:</strong> {t('For website hosting', 'वेबसाइट होस्टिंग के लिए')}</li>
                            </ul>
                        </div>

                        {/* Data Security */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-royal-blue mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center text-lg">6</span>
                                {t('Data Security', 'डेटा सुरक्षा')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {t(
                                    'We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
                                    'हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए उचित सुरक्षा उपाय लागू करते हैं। हालांकि, इंटरनेट पर प्रसारण का कोई भी तरीका 100% सुरक्षित नहीं है, और हम पूर्ण सुरक्षा की गारंटी नहीं दे सकते।'
                                )}
                            </p>
                        </div>

                        {/* Your Rights */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-royal-blue mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center text-lg">7</span>
                                {t('Your Rights', 'आपके अधिकार')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {t('You have the right to:', 'आपको अधिकार है:')}
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>{t('Access your personal data', 'अपने व्यक्तिगत डेटा तक पहुंच')}</li>
                                <li>{t('Request correction of your data', 'अपने डेटा में सुधार का अनुरोध')}</li>
                                <li>{t('Request deletion of your account', 'अपने खाते को हटाने का अनुरोध')}</li>
                                <li>{t('Opt-out of marketing communications', 'मार्केटिंग संचार से बाहर निकलना')}</li>
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-royal-blue mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 bg-royal-blue/10 rounded-full flex items-center justify-center text-lg">8</span>
                                {t('Contact Us', 'हमसे संपर्क करें')}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {t(
                                    'If you have questions about this Privacy Policy, please contact us at:',
                                    'यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:'
                                )}
                            </p>
                            <div className="mt-4 p-4 bg-sand rounded-xl">
                                <p className="text-gray-700 font-medium">📧 contact@VisionGuard.com</p>
                            </div>
                        </div>

                    </div>

                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-desert-gold font-semibold hover:underline"
                        >
                            ← {t('Back to Home', 'होम पर वापस जाएं')}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
