import Link from 'next/link';
import { getContactMessages } from '@/lib/firebaseService';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Tin Nhắn</h2>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">Chưa có tin nhắn nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`bg-white rounded-xl shadow p-6 hover:shadow-lg transition ${
                message.status === 'new' ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{message.customerName}</h3>
                  {message.customerEmail && (
                    <p className="text-sm text-gray-500">{message.customerEmail}</p>
                  )}
                  {message.customerPhone && (
                    <p className="text-sm text-gray-500">📞 {message.customerPhone}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    message.status === 'new' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.status === 'new' ? '● Chưa đọc' : '✓ Đã đọc'}
                  </span>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(message.createdAt.seconds * 1000).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>

              <div className="mt-4 flex gap-2">
                {message.customerEmail && (
                  <a 
                    href={`mailto:${message.customerEmail}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    📧 Trả lời qua Email
                  </a>
                )}
                {message.customerPhone && (
                  <a 
                    href={`tel:${message.customerPhone}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                  >
                    📞 Gọi điện
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
