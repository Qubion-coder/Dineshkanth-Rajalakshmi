import React, { useState } from 'react';

export default function AdminPage() {
  const [language, setLanguage] = useState<'english' | 'sinhala'>('english');
  const [prefix, setPrefix] = useState('Mr.');
  const [customPrefix, setCustomPrefix] = useState('');
  const [guestName, setGuestName] = useState('');
  const [inviteType, setInviteType] = useState('ඔබ සැමට');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const getFinalPrefix = () => prefix === 'Other' ? customPrefix : prefix;

  const generateLink = () => {
    const origin = window.location.origin;
    const path = language === 'sinhala' ? '/sinhala' : '/';
    const url = new URL(path, origin);
    const finalPrefix = getFinalPrefix();
    if (finalPrefix) url.searchParams.set('prefix', finalPrefix);
    if (guestName) url.searchParams.set('guestName', guestName);
    if (language === 'sinhala') url.searchParams.set('inviteType', inviteType);
    return url.toString();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generateLink());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateMessage = () => {
    const finalPrefix = getFinalPrefix();
    if (language === 'english') {
      return `Dear ${finalPrefix} ${guestName} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${generateLink()}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Ramessh Kanna & Thismila`;
    } else {
      return `ආදරණීය ${finalPrefix} ${guestName} ❤️\n\nඅපගේ ජීවිතයේ සුවිශේෂීම දිනයක් වන අපගේ විවාහ මංගල්‍යයට සහභාගී වන ලෙස අපි ${inviteType} ආදරයෙන් ආරාධනා කර සිටින්නෙමු.\n\nපහත link එක හරහා අපගේ විවාහ මංගල්‍යයේ ආරාධනා පත සහ සියලු විස්තර නරඹන්න 🌐:\n\n${generateLink()}\n\nඔබගේ පැමිණීම අපට මහත් ආශිර්වාදයක් වනු ඇත.\n\nආදරයෙන්,\n❤️ Ramessh Kanna & Thismila`;
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generateMessage());
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="h-[100dvh] overflow-y-auto w-full bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Invitation Link Generator
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            
            {/* Language Selection */}
            <div className="flex justify-center space-x-4 pb-2 border-b border-gray-200">
              <button
                onClick={() => setLanguage('english')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${language === 'english' ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('sinhala')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${language === 'sinhala' ? 'bg-amber-100 text-amber-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sinhala
              </button>
            </div>

            <div>
              <label htmlFor="prefix" className="block text-sm font-medium text-gray-700">Select Prefix</label>
              <select
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md border"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
                <option value="">(None)</option>
                <option value="Other">Other (Type custom)</option>
              </select>
            </div>

            {prefix === 'Other' && (
              <div>
                <label htmlFor="customPrefix" className="block text-sm font-medium text-gray-700">Custom Prefix</label>
                <input
                  id="customPrefix"
                  type="text"
                  placeholder="e.g. Dr."
                  value={customPrefix}
                  onChange={(e) => setCustomPrefix(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700">Guest Name</label>
              <input
                id="guestName"
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
            </div>

            {language === 'sinhala' && (
              <div>
                <label htmlFor="inviteType" className="block text-sm font-medium text-gray-700">Invite Type (Sinhala)</label>
                <select
                  id="inviteType"
                  value={inviteType}
                  onChange={(e) => setInviteType(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md border"
                >
                  <option value="ඔබට">ඔබට (You - Single)</option>
                  <option value="ඔබ දෙපලට">ඔබ දෙපලට (You both - Couple)</option>
                  <option value="ඔබ සැමට">ඔබ සැමට (You all - Family)</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-4 space-y-3">
            <div className="p-3 bg-gray-100 rounded text-sm text-gray-600 break-all">
              <strong>Link:</strong> {generateLink()}
            </div>
            <div className="p-3 bg-gray-100 rounded text-sm text-gray-600 whitespace-pre-wrap max-h-48 overflow-y-auto">
              <strong>Message Preview:</strong><br />
              <span className="block mt-2">{generateMessage()}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              {copiedLink ? 'Copied!' : 'Copy Link Only'}
            </button>
            <button
              onClick={handleCopyMessage}
              className="w-full flex justify-center py-2 px-4 border border-amber-600 rounded-md shadow-sm text-sm font-medium text-amber-700 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              {copiedMessage ? 'Copied!' : 'Copy Full Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
