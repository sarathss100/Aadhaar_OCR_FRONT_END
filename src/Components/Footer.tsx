import { FileText } from 'lucide-react';

const Footer = function () {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6" />
                <span className="text-lg font-bold">Aadhaar Extractor</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Secure and accurate Aadhaar information extraction service powered by advanced OCR technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• High accuracy OCR extraction</li>
                <li>• Secure image processing</li>
                <li>• Fast processing times</li>
                <li>• JSON data export</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Security</h3>
              <p className="text-gray-400 leading-relaxed">
                Your uploaded images are processed securely and are not stored on our servers. All data remains private and confidential.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Aadhaar Extractor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
};

export default Footer;